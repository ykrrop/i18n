import Cookies from "js-cookie";
import { type FC } from "react";
import { useNavigate } from "react-router-dom";

import { SUPPORTED_LANGS } from "@/constants";
import { useLocale } from "@/lib/use-locale";

import styles from "./styles.module.css";

const LANG_COOKIE_NAME = "i18n-l10n-conf-lang";

export const LangSelect: FC = () => {
    const navigate = useNavigate();
    const { currentLang, currentRegion } = useLocale();

    const handleLangChange = (lang: string) => {
        // Save selected language in cookie
        Cookies.set(LANG_COOKIE_NAME, lang);

        // Navigate to new URL with selected language
        const path = window.location.pathname.replace(/^\/[^/]*/, "");
        const targetLocale = currentRegion ? `${lang}-${currentRegion}` : lang;
        navigate(`/${targetLocale}${path || ""}`);
    };

    return (
        <select
            className={styles.select}
            value={currentLang}
            onChange={(e) => handleLangChange(e.target.value)}
            data-testid="lang-select"
        >
            {SUPPORTED_LANGS.map((lang) => (
                <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                </option>
            ))}
        </select>
    );
};
