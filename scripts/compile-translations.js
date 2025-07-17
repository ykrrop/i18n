/* global console, process */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const TRANSLATIONS_FILE = "translations.json";
const PAGE_TRANSLATION_KEYS_FILE = "src/page-translation-keys.ts";
const OUTPUT_DIR = "public/translations-compiled";

// Read translations
const translations = JSON.parse(readFileSync(TRANSLATIONS_FILE, "utf8"));

// Read page translation keys
const pageKeysContent = readFileSync(PAGE_TRANSLATION_KEYS_FILE, "utf8");
const pageKeysMatch = pageKeysContent.match(
    /export\s+const\s+PAGE_TRANSLATION_KEYS\s*=\s*({[\s\S]*?});/
);

if (!pageKeysMatch) {
    console.error("Could not find PAGE_TRANSLATION_KEYS in the source file");
    process.exit(1);
}

// Parse the object literal directly instead of using eval
const pageKeysString = pageKeysMatch[1]
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
    .replace(/'/g, '"') // Replace single quotes with double quotes
    .replace(/(\w+):/g, '"$1":'); // Add quotes around property names

try {
    const pageKeys = JSON.parse(pageKeysString);

    // Create output directory
    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Compile translations for each language and page
    for (const lang of ["ru", "en", "ar"]) {
        const langDir = join(OUTPUT_DIR, lang);
        if (!existsSync(langDir)) {
            mkdirSync(langDir);
        }

        // Create translations for each page
        for (const [page, keys] of Object.entries(pageKeys)) {
            const pageTranslations = {};
            for (const key of keys) {
                if (translations[key]?.[lang]) {
                    pageTranslations[key] = translations[key][lang];
                }
            }

            // Write compiled translations
            writeFileSync(
                join(langDir, `${page}.json`),
                JSON.stringify(pageTranslations)
            );
        }
    }

    console.log("Translations compiled successfully!");
} catch (error) {
    console.error("Error parsing page translation keys:", error);
    console.error("Generated JSON string:", pageKeysString);
    process.exit(1);
}
