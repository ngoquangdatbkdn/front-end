//Importing dictionaries for vee-validate
import ja from "vee-validate/dist/locale/ja";
import vi from "vee-validate/dist/locale/vi";
import VeeValidate, { Validator } from "vee-validate";
import jaTranslation from '~/locales/ja.json'
import viTranslation from '~/locales/vi.json'

export default function({ app }) {
  //Loading languages for Vee
  Validator.localize("ja", {
    messages: ja.messages,
    // attributes: {
    //   "company.company_name": jaTranslation.company.company_name,
    // }
  });
  Validator.localize("vi", {
      messages: vi.messages,
      // attributes: {
      //     "company.company_name": viTranslation.company.company_name,
      // }
  });

  //Localizing the app whja user reviesh or access a localized link
  Validator.localize(app.i18n.loadedLanguages[0]);

  //Called everytime language change
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    Validator.localize(newLocale);
  };
}
