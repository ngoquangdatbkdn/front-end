export default {
  locales: [
    {
      code: "ja",
      iso: "ja-JP",
      name: "Japanese",
      file: "ja.json"
    },
    {
      code: "vi",
      iso: "vi-VN",
      name: "Vietnamese",
      file: "vi.json"
    }
  ],
  defaultLocale: "ja",
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "my_custom_cookie_name"
  },
  baseUrl: "",
  seo: true,
  lazy: true,
  parsePages: false,
  vueI18n: {
    fallbackLocale: "ja"
  },
  langDir: "locales/",
  encodePaths: false
};
