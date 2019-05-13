import NuxtConfiguration from "@nuxt/config";
import i18nConfig from "./locales/config";
import webpack from "webpack";
import path from "path";

const config: NuxtConfiguration = {
  mode: "universal",
  head: {
    title: "starter",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt TS project" }
    ],
    script: [
      // { src: "https://npmcdn.com/flatpickr/dist/l10n/vi.js", type: "application/javascript" },
      // { src: "https://npmcdn.com/flatpickr/dist/l10n/ja.js", type: "application/javascript"  }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
      // {
      //   rel: "stylesheet",
      //   href: "https://unpkg.com/vue-select@2.6.0/dist/vue-select.css"
      // }
    ]
  },
  // loading: { color: '#3B8070' },
  // css: ['tachyons/css/tachyons.min.css', '~/assets/css/main.css'],
  css: [
    "@/assets/vendor/nucleo/css/nucleo.css",
    "@/assets/vendor/font-awesome/css/font-awesome.css",
    "@/assets/scss/argon.scss",
    "@/assets/scss/app.scss"
  ],
  plugins: [
    "~/plugins/argon-kit",
    "~/plugins/axios",
    "~/plugins/vue-moment",
    { src: "~/plugins/vue-notifications", ssr: false },
    { src: "~/plugins/i18n", ssr: false },
    { src: "~/plugins/vue-lazyload", ssr: false },
    { src: "~/plugins/vue-click-outside", ssr: false },
    { src: "~/plugins/vee-validate", ssr: false },
    { src: "~/plugins/vue-select", ssr: false },
    { src: "~/plugins/vue-froala", ssr: false },
    { src: "~/plugins/vue-upload", ssr: false },
    { src: "~/plugins/vue-slider", ssr: true }
  ],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    // 'bootstrap-vue/nuxt',
    // "@nuxtjs/pwa",
    ["nuxt-i18n", i18nConfig]
  ],
  workbox: {
    cacheAssets: false, // for /*
    offline: false // for /_nuxt/*
  },
  build: {
    extend(config, ctx) {},
    loaders: [
      {
        test: /\.css$/,
        loader: "vue-style-loader!css-loader"
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url",
        query: {
          limit: 10000,
          name: path.posix.join("/assets", "fonts/[name].[hash:7].[ext]")
        }
      }
    ],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  },
  router: {
    middleware: ["auth-guard"]
  },
  loading: {
    color: "#5e72e4",
    height: "2px"
  },
  axios: {
      baseURL: "http://127.0.0.1:3001/",
  },

  auth: {
    redirect: {
      callback: "/callback"
    },
    strategies: {
      local: {
        endpoints: {

          login: { propertyName: "data.token" }
        }
      }
    }
  }
  // router: {
  //   middleware: "i18n"
  // },
  // generate: {
  //   routes: ["/", "/fr"]
  // }
};

export default config;
