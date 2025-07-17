import Cookies from "js-cookie";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    SUPPORTED_LANGS,
    SUPPORTED_LOCALES,
    type SupportedLang,
    type SupportedLocale,
} from "@/constants";
import { getRegion } from "@/lib/geo-service";

const LANG_COOKIE_NAME = "i18n-l10n-conf-lang";

type LocaleParams = {
    locale?: string;
};

export function useLocale() {
    const navigate = useNavigate();
    const { locale } = useParams<LocaleParams>();
    const userRegion = getRegion();

    // Parse current locale from URL
    const [currentLang] = useMemo(() => {
        if (!locale) return [null, null];
        const [lang, region] = locale.split("-");
        return [lang, region || null];
    }, [locale]);

    // Determine the language based on priority:
    // URL -> Cookie -> Browser -> Default (en)
    const detectedLang = useMemo(() => {
        if (
            currentLang &&
            SUPPORTED_LANGS.includes(currentLang as SupportedLang)
        ) {
            return currentLang as SupportedLang;
        }

        const cookieLang = Cookies.get(LANG_COOKIE_NAME);
        if (
            cookieLang &&
            SUPPORTED_LANGS.includes(cookieLang as SupportedLang)
        ) {
            return cookieLang as SupportedLang;
        }

        const browserLang = navigator.language.split("-")[0];
        if (SUPPORTED_LANGS.includes(browserLang as SupportedLang)) {
            return browserLang as SupportedLang;
        }

        return "en" as SupportedLang;
    }, [currentLang]);

    // Determine if we need to include region in URL
    const shouldIncludeRegion = useMemo(() => {
        if (!userRegion) return false;
        const localeWithRegion =
            `${detectedLang}-${userRegion}` as SupportedLocale;
        return SUPPORTED_LOCALES.includes(localeWithRegion);
    }, [detectedLang, userRegion]);

    // Handle redirects based on locale rules
    useEffect(() => {
        const targetLocale = shouldIncludeRegion
            ? `${detectedLang}-${userRegion}`
            : detectedLang;

        // If current locale doesn't match target locale, redirect
        if (locale !== targetLocale) {
            const path = window.location.pathname.replace(/^\/[^/]*/, "");
            navigate(`/${targetLocale}${path || ""}`, { replace: true });
        }
    }, [locale, detectedLang, userRegion, shouldIncludeRegion, navigate]);

    return {
        currentLang: detectedLang,
        currentRegion: shouldIncludeRegion ? userRegion : null,
        isRtl: detectedLang === "ar",
    };
}
