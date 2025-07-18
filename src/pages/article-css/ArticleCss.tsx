import { type FC, useEffect, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useParams } from "react-router-dom";

import { Layout, Loader } from "@/components";
import { type SupportedLang } from "@/constants";
import { loadTranslations } from "@/lib/load-translations";

import styles from "./styles.module.css";

export const ArticleCss: FC = () => {
    const { locale } = useParams<{ locale?: string }>();
    const lang = (locale?.split("-")[0] || "en") as SupportedLang;
    const [messages, setMessages] = useState<Record<string, string> | null>(
        null
    );

    useEffect(() => {
        loadTranslations(lang, "articleCss").then(setMessages);
    }, [lang]);

    if (!messages) return <Loader />;

    return (
        <IntlProvider locale={lang} messages={messages}>
            <Layout>
                <main className={styles.article}>
                    <h1>
                        <FormattedMessage
                            id="articleCss.title"
                            defaultMessage="CSS Logical Properties"
                        />
                    </h1>

                    <p>
                        <FormattedMessage
                            id="articleCss.intro"
                            defaultMessage="Introduction to CSS logical properties"
                        />
                    </p>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: messages["articleCss.diff"] || "",
                        }}
                    />

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleCss.whyImportant.title"
                                defaultMessage="Why are logical properties important?"
                            />
                        </h2>
                        <p>
                            <FormattedMessage
                                id="articleCss.whyImportant.text"
                                defaultMessage="Understanding the importance of logical properties"
                            />
                        </p>
                        <p>
                            <FormattedMessage
                                id="articleCss.whyImportant.listText"
                                defaultMessage="Key benefits of using logical properties:"
                            />
                        </p>
                        <div className={styles.list}>
                            <FormattedMessage
                                id="articleCss.whyImportant.listContent"
                                defaultMessage="List of benefits"
                            >
                                {(msg) => (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: msg,
                                        }}
                                    />
                                )}
                            </FormattedMessage>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>
                            <FormattedMessage
                                id="articleCss.conclusion.title"
                                defaultMessage="Conclusion"
                            />
                        </h2>
                        <p>
                            <FormattedMessage
                                id="articleCss.conclusion.text"
                                defaultMessage="Summary of logical properties benefits"
                            />
                        </p>
                    </section>
                </main>
            </Layout>
        </IntlProvider>
    );
};
