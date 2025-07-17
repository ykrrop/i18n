import { useQuery } from "@tanstack/react-query";

import { type SupportedLang } from "@/constants";

export function useTranslations(lang: SupportedLang, page: string) {
    return useQuery({
        queryKey: ["translations", lang, page],
        queryFn: async () => {
            const response = await fetch(
                `/translations-compiled/${lang}/${page}.json`
            );
            if (!response.ok) {
                throw new Error(
                    `Failed to load translations for ${lang}/${page}`
                );
            }
            return response.json();
        },
    });
}
