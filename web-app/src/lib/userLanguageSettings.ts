
import UserStore from "../app/stores/userStore";
import i18n from "./i18n";

export async function initializeUserAndLanguageSettings(userStore: UserStore) {
    if (userStore.token) {
      await userStore.getUser().finally(() => userStore.setAppLoaded());
      const lang = localStorage.getItem("language");
      
      if (lang === 'ar') {
        i18n.changeLanguage(lang);
        userStore.setLanguage(lang);
        document.documentElement.setAttribute('lang', 'ar');
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('lang', 'en');
        document.documentElement.setAttribute('dir', 'ltr');
      }
    } else {
      userStore.setAppLoaded();
    }
  }
  