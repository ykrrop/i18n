import { type SupportedLang } from "@/constants";
import { type PAGE_TRANSLATION_KEYS } from "@/page-translation-keys";

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
        // Load compiled translations for the page
        const response = await fetch(
            `/translations-compiled/${lang}/${page}.json`
        );
        const translations = await response.json();

        // Cache the translations
        loadedTranslations[cacheKey] = translations;

        return translations;
    } catch (error) {
        console.error(`Failed to load translations for ${cacheKey}:`, error);
        return {};
    }
}
