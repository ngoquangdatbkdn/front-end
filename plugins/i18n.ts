// Importing dictionaries for vee-validate
import ja from 'vee-validate/dist/locale/ja'
import vi from 'vee-validate/dist/locale/vi'
import VeeValidate, { Validator } from 'vee-validate'
import jaTranslation from '~/locales/ja.json'
import viTranslation from '~/locales/vi.json'
import flatpickr from 'flatpickr'
import { Japanese } from 'flatpickr/dist/l10n/ja.js'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'

export default function ({ app }) {
  // Loading languages for Vee
  Validator.localize('ja', {
    messages: ja.messages
    // attributes: {
    //   "company.company_name": jaTranslation.company.company_name,
    // }
  })
  Validator.localize('vi', {
    messages: vi.messages
    // attributes: {
    //     "company.company_name": viTranslation.company.company_name,
    // }
  })

  Vietnamese.rangeSeparator = ' đến '
  Japanese.rangeSeparator = ' >> '
  // Localizing the app whja user reviesh or access a localized link
  Validator.localize(app.i18n.loadedLanguages[0])
  switch (app.i18n.loadedLanguages[0]) {
    case 'ja':
      flatpickr.localize(Japanese)
      break
    case 'vi':
      flatpickr.localize(Vietnamese)
      break
  }

  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    // console.log("oldLocale " + oldLocale);
    // console.log("newLocale " + newLocale);
    Validator.localize(newLocale)
    switch (newLocale) {
      case 'ja':
        flatpickr.localize(Japanese)
        break
      case 'vi':
        flatpickr.localize(Vietnamese)
        break
    }
  }
  // Called everytime language change
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    // flatpickr.localize(flatpickr.l10ns.en);
    // console.log(newLocale)
    // console.log(flatpickr.l10ns)
  }
}
