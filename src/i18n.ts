import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import main from "../public/locales/en/main.json";
import mainDe from "../public/locales/de/main.json";
import mainEs from "../public/locales/es/main.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      main,
    },
    de: {
      main: mainDe,
    },
    es: {
      main: mainEs,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
