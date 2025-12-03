"use client";

import {createContext, useEffect} from "react";
import en from "../../app/messages/en.json";
import km from "../../app/messages/km.json";
import i18next from "i18next";
import {I18nextProvider, initReactI18next, useTranslation} from "react-i18next";

interface AppContextProps {
    onLocaleChange: (value: "en" | "km") => void;
}

const LangKey = "_lang";

const getLocaleLang = () => {
    if (typeof window === "undefined") return;

    const locale = localStorage.getItem(LangKey);

    if (!locale) return null;

    return atob(locale);
}

const setLocaleLang = (value: "en" | "km") => {
    if (typeof window === "undefined") return;

    localStorage.setItem(LangKey, btoa(value));
}

if (!i18next.isInitialized) {
    i18next.use(initReactI18next).init({
        lng: getLocaleLang() || "en",
        fallbackLng: "en",
        resources: {
            en: {translation: en},
            km: {translation: km}
        },
        interpolation: {escapeValue: false}
    }).then()
}

export const AppContext = createContext<AppContextProps | null>(null);

const AppTranslation = ({children}) => {
    const {i18n} = useTranslation();
    const onLocaleChange = (value: "en" | "km") => i18n.changeLanguage(value).then(() => setLocaleLang(value));

    useEffect(() => {
        if (!getLocaleLang())
            setLocaleLang("en");
        // eslint-disable-next-line
    }, []);

    return <I18nextProvider i18n={i18next}>
        <AppContext.Provider value={{onLocaleChange}}>
            {children}
        </AppContext.Provider>
    </I18nextProvider>
}

export default AppTranslation