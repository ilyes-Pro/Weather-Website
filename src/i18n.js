import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationAR from './locales/ar/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {

            ar: { translation: translationAR }
        },
        lng: 'ar',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

export default i18n;
