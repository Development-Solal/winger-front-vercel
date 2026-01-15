import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next) // Passes i18next to react-i18next
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr }
    },
    lng: "fr",
    fallbackLng: "fr", // Default language
    interpolation: {
      escapeValue: false // React already escapes data
    }
  });

export default i18n;
