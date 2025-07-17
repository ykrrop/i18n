/* global console, process */
import { execSync } from "child_process";
import {
    readFileSync,
    writeFileSync,
    unlinkSync,
    existsSync,
    mkdirSync,
} from "fs";
import { join } from "path";

const TEMP_FILE = "temp-messages.json";
const TRANSLATIONS_FILE = "translations.json";
const OUTPUT_DIR = "public/translations-compiled";

try {
    // Extract messages from source files
    console.log("Extracting messages...");
    execSync(
        `formatjs extract "src/**/*.{ts,tsx}" --out-file ${TEMP_FILE} --id-interpolation-pattern "[sha512:contenthash:base64:6]"`,
        { stdio: "inherit" }
    );

    // Read extracted messages
    const extractedMessages = JSON.parse(readFileSync(TEMP_FILE, "utf8"));

    // Read existing translations
    const translations = JSON.parse(readFileSync(TRANSLATIONS_FILE, "utf8"));

    // Update translations with new messages
    let hasChanges = false;
    for (const [id, message] of Object.entries(extractedMessages)) {
        if (!translations[id]) {
            translations[id] = {
                ru: message.defaultMessage,
                en: "",
                ar: "",
            };
            hasChanges = true;
        }
    }

    // Save updated translations
    if (hasChanges) {
        writeFileSync(TRANSLATIONS_FILE, JSON.stringify(translations, null, 4));
        console.log("Updated translations.json with new messages");
    } else {
        console.log("No new messages found");
    }

    // Clean up
    unlinkSync(TEMP_FILE);

    // Compile messages for each language
    console.log("\nCompiling messages...");

    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    for (const lang of ["ru", "en", "ar"]) {
        const langMessages = {};
        for (const [id, translation] of Object.entries(translations)) {
            langMessages[id] = translation[lang] || translation.ru; // Fallback to Russian
        }

        const langDir = join(OUTPUT_DIR, lang);
        if (!existsSync(langDir)) {
            mkdirSync(langDir);
        }

        writeFileSync(
            join(langDir, "messages.json"),
            JSON.stringify(langMessages, null, 2)
        );
    }

    console.log("Done!");
} catch (error) {
    console.error("Error:", error.message);
    // Clean up temp file if it exists
    if (existsSync(TEMP_FILE)) {
        try {
            unlinkSync(TEMP_FILE);
        } catch (cleanupError) {
            console.error(
                "Failed to clean up temp file:",
                cleanupError.message
            );
        }
    }
    process.exit(1);
}
