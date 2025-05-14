import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ja: {
        translation: require('./locales/ja.json')
      },
      en: {
        translation: require('./locales/en.json')
      }
    },
    lng: 'ja',
    fallbackLng: 'ja',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
