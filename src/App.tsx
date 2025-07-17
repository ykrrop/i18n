import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { IntlProvider } from "@/components";
import { ScrollToTop } from "@/components/scroll-to-top";
import {
    ArticleAr,
    ArticleCss,
    ArticleEn,
    ArticleI18nKz,
    ArticleL10nRu,
    ArticleRtlIcons,
    ArticleUiBy,
    Home,
} from "@/pages";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Navigate to="/en" replace />} />
                <Route path="/:locale">
                    <Route
                        index
                        element={
                            <IntlProvider>
                                <Home />
                            </IntlProvider>
                        }
                    />
                    <Route path="article">
                        <Route
                            path="rtl-icons"
                            element={
                                <IntlProvider>
                                    <ArticleRtlIcons />
                                </IntlProvider>
                            }
                        />
                        <Route
                            path="css"
                            element={
                                <IntlProvider>
                                    <ArticleCss />
                                </IntlProvider>
                            }
                        />
                        <Route
                            path="l10n-ru"
                            element={
                                <IntlProvider>
                                    <ArticleL10nRu />
                                </IntlProvider>
                            }
                        />
                        <Route
                            path="ui-by"
                            element={
                                <IntlProvider>
                                    <ArticleUiBy />
                                </IntlProvider>
                            }
                        />
                        <Route
                            path="i18n-kz"
                            element={
                                <IntlProvider>
                                    <ArticleI18nKz />
                                </IntlProvider>
                            }
                        />
                        <Route
                            path="en"
                            element={
                                <IntlProvider>
                                    <ArticleEn />
                                </IntlProvider>
                            }
                        />
                        <Route
                            path="ar"
                            element={
                                <IntlProvider>
                                    <ArticleAr />
                                </IntlProvider>
                            }
                        />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/en" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
