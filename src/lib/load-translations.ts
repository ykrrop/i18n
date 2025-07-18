import { type SupportedLang } from "@/constants";
import { PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

type PageKey = keyof typeof PAGE_TRANSLATION_KEYS;

const loadedTranslations: Record<string, Record<string, string>> = {};

export async function loadTranslations(
    lang: SupportedLang,
    page: PageKey
): Promise<Record<string, string>> {
    const cacheKey = `${lang}-${page}`;

    // Return from cache if available
    if (loadedTranslations[cacheKey]) {
        return loadedTranslations[cacheKey];
    }

    try {
        // Load translations from locales directory
        const response = await fetch(`/src/locales/${lang}.json`);
        const allTranslations = await response.json();

        // Filter translations for the current page
        const pageTranslations: Record<string, string> = {};
        const pageKeys = PAGE_TRANSLATION_KEYS[page];

        for (const key of pageKeys) {
            if (allTranslations[key]) {
                pageTranslations[key] = allTranslations[key];
            }
        }

        // Cache the translations
        loadedTranslations[cacheKey] = pageTranslations;

        return pageTranslations;
    } catch (error) {
        console.error(`Failed to load translations for ${lang}:`, error);
        return {};
    }
}
