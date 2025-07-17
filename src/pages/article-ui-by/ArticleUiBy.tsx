import { type FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import articleImage from "@/assets/article-ui-by.jpg";
import { Layout } from "@/components";
import { ClockIcon, MessageIcon } from "@/icons";

import styles from "./styles.module.css";

export const ArticleUiBy: FC = () => {
    const intl = useIntl();

    return (
        <Layout>
            <article className={styles.article}>
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        <FormattedMessage
                            id="wc5NeW"
                            defaultMessage="Двухъязычный интерфейс: как учесть русский и белорусский языки в одном продукте"
                        />
                    </h1>

                    <div className={styles.metadata}>
                        <div className={styles.metaItem}>
                            <ClockIcon />
                            <FormattedMessage
                                id="Zw+W5M"
                                defaultMessage="10 минут чтения"
                            />
                        </div>
                        <div className={styles.metaItem}>
                            <MessageIcon />
                            <FormattedMessage
                                id="0TPE67"
                                defaultMessage="Перевод и локализация"
                            />
                        </div>
                    </div>
                </header>

                <img
                    src={articleImage}
                    alt={intl.formatMessage({
                        id: "7x3+1o",
                        defaultMessage:
                            "Иллюстрация к статье о двухъязычном интерфейсе",
                    })}
                    className={styles.image}
                />

                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        <FormattedMessage
                            id="o2caYc"
                            defaultMessage="Создание интерфейса для Беларуси — это вызов двуязычия. Продукт должен быть понятен и русскоязычным, и белорусскоязычным пользователям. Мы рассматриваем, как организовать структуру переводов, какие существуют UX-решения для переключения языка и почему важно уделять внимание аутентичности белорусского контента."
                        />
                    </p>

                    <h2 className={styles.subtitle}>
                        <FormattedMessage
                            id="6+6HjS"
                            defaultMessage="Особенности белорусской локализации"
                        />
                    </h2>

                    <p className={styles.paragraph}>
                        <FormattedMessage
                            id="MonVAe"
                            defaultMessage="При разработке двуязычного интерфейса важно учитывать особенности белорусского языка: длину слов, специфические символы, культурные особенности. Это влияет на дизайн компонентов и общую структуру интерфейса."
                        />
                    </p>
                </div>
            </article>
        </Layout>
    );
};
