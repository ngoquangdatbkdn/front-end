import NuxtConfiguration from "@nuxt/config";

const config: NuxtConfiguration = {
  mode: "universal",
  head: {
    title: "starter",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt TS project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  // loading: { color: '#3B8070' },
  // css: ['tachyons/css/tachyons.min.css', '~/assets/css/main.css'],
  loading: { color: "#fff" },
  css: [
      // "@/assets/vendor/nucleo/css/nucleo.css",
      // "@/assets/vendor/font-awesome/css/font-awesome.css",
      // "@/assets/scss/argon.scss",
      "@/assets/scss/app.scss"
  ],
  plugins: [
    "~/plugins/argon-kit",
    "~/plugins/i18n",
    { src: "~/plugins/vue-lazyload", ssr: false },
    { src: "~/plugins/vue-click-outside", ssr: false }
  ],
  modules: [
    "@nuxtjs/axios",
    // 'bootstrap-vue/nuxt',
    // "@nuxtjs/pwa",
    // [
    //   "nuxt-i18n",
    //   {
    //     locales: ["ja", "vi"],
    //     defaultLocale: "ja",
    //     detectBrowserLanguage: {
    //       useCookie: true,
    //       cookieKey: "my_custom_cookie_name"
    //     }
    //   }
    // ]
  ],
    workbox: {
        cacheAssets: false, // for /*
        offline: false // for /_nuxt/*
    },
  axios: {},
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },
  router: {
    middleware: "i18n"
  },
  generate: {
    routes: ["/", "/fr"]
  }
};

export default config;
