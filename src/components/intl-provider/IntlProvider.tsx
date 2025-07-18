import { type ReactNode, useEffect } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { useLocation } from "react-router-dom";

import { useLocale } from "@/lib/use-locale";
import { useTranslations } from "@/lib/use-translations";
import { PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

type Props = {
    children: ReactNode;
};

export function IntlProvider({ children }: Props) {
    const { currentLang, isRtl } = useLocale();
    const { pathname } = useLocation();

    // Update HTML lang attribute when language changes
    useEffect(() => {
        document.documentElement.lang = currentLang;
    }, [currentLang]);

    // Determine current page from pathname
    const path = pathname.split("/").filter(Boolean);
    const page = path[1] === "article" ? `article${path[2]}` : "homePage";
    const pageKey = Object.keys(PAGE_TRANSLATION_KEYS).find(
        (key) => key.toLowerCase() === page.toLowerCase()
    ) as keyof typeof PAGE_TRANSLATION_KEYS;

    // Load translations for current page
    const { data: messages = {} } = useTranslations(
        currentLang,
        pageKey || "homePage"
    );

    return (
        <ReactIntlProvider
            messages={messages}
            locale={currentLang}
            defaultLocale="en"
        >
            <div dir={isRtl ? "rtl" : "ltr"}>{children}</div>
        </ReactIntlProvider>
    );
}
