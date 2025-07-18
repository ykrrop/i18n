import { useQuery } from "@tanstack/react-query";

import { type SupportedLang } from "@/constants";
import { loadTranslations } from "@/lib/load-translations";
import { type PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

type PageKey = keyof typeof PAGE_TRANSLATION_KEYS;

export function useTranslations(lang: SupportedLang, page: PageKey) {
    return useQuery({
        queryKey: ["translations", lang, page],
        queryFn: () => loadTranslations(lang, page),
    });
}
