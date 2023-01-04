// import the original type declarations
import 'react-i18next'
// import all namespaces (for the default language, only)
import common from './public/locales/en/common.json'
import homepage from './public/locales/en/homepage.json'
import propertyItem from './public/locales/en/propertyItem.json'
import propertyListPage from './public/locales/en/propertyListPage.json'
import settingPage from './public/locales/en/settingPage.json'
import propertyDetailPage from './public/locales/en/propertyDetailPage.json'
import settingMenu from './public/locales/en/settingMenu.json'
import settingProfilePage from './public/locales/en/settingProfilePage.json'
import settingSubscriptionsPage from './public/locales/en/settingSubscriptionsPage.json'
import updatePasswordPage from './public/locales/en/updatePasswordPage.json'
import savedSearchesPage from './public/locales/en/savedSearchesPage.json'
import savedHomePage from './public/locales/en/savedHomePage.json'

// react-i18next versions lower than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface Resources {
    common: typeof common
    homepage: typeof homepage
    propertyItem: typeof propertyItem
    propertyListPage: typeof propertyListPage
    settingPage: typeof settingPage
    propertyDetailPage: typeof propertyDetailPage
    settingMenu: typeof settingMenu
    settingProfilePage: typeof settingProfilePage
    settingSubscriptionsPage: typeof settingSubscriptionsPage
    updatePasswordPage: typeof updatePasswordPage
    savedSearchesPage: typeof savedSearchesPage
    savedHomePage: typeof savedHomePage
  }
}

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'common'
    // custom resources type
    resources: {
      common: typeof common
      homepage: typeof homepage
      propertyItem: typeof propertyItem
      propertyListPage: typeof propertyListPage
      settingPage: typeof settingPage
      propertyDetailPage: typeof propertyDetailPage
      settingMenu: typeof settingMenu
      settingProfilePage: typeof settingProfilePage
      settingSubscriptionsPage: typeof settingSubscriptionsPage
      updatePasswordPage: typeof updatePasswordPage
      savedSearchesPage: typeof savedSearchesPage
      savedHomePage: typeof savedHomePage
    }
  }
}
