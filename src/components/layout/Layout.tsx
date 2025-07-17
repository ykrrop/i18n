import { type FC, type ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { LangSelect } from "@/components";
import { BRAND_NAMES } from "@/constants/brand-names";
import { BrandLogoIcon, TelegramIcon, VkontakteIcon } from "@/icons";
import { useLocale } from "@/lib/use-locale";

import styles from "./styles.module.css";

type Props = {
    children: ReactNode;
};

const SOCIAL_LINKS = [
    {
        Icon: TelegramIcon,
        url: "https://t.me/conference",
        ariaLabel: "Telegram",
    },
    {
        Icon: VkontakteIcon,
        url: "https://vk.com/conference",
        ariaLabel: "VKontakte",
    },
] as const;

export const Layout: FC<Props> = ({ children }) => {
    const { currentLang, isRtl } = useLocale();
    const intl = useIntl();
    const brandName = BRAND_NAMES[currentLang];

    return (
        <div className={styles.layout} dir={isRtl ? "rtl" : "ltr"}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <Link
                        className={styles.headerBrand}
                        to="/"
                        aria-label={brandName}
                    >
                        <BrandLogoIcon />
                        <span className={styles.headerBrandText}>
                            {brandName}
                        </span>
                    </Link>

                    <LangSelect />
                </div>
            </header>

            <main className={styles.contentContainer}>{children}</main>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerText}>
                        <FormattedMessage
                            id="hhmTen"
                            defaultMessage="© {yearStart}-{yearEnd}, ООО «{brand}». Все права защищены"
                            values={{
                                yearStart: "2024",
                                yearEnd: "2025",
                                brand: brandName,
                            }}
                        />
                    </div>

                    <nav
                        className={styles.footerSocialLinks}
                        aria-label={intl.formatMessage({
                            id: "k2miQ9",
                            defaultMessage: "Социальные сети",
                        })}
                    >
                        {SOCIAL_LINKS.map(({ Icon, url, ariaLabel }) => (
                            <a
                                key={url}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={ariaLabel}
                            >
                                <Icon />
                            </a>
                        ))}
                    </nav>
                </div>
            </footer>
        </div>
    );
};
