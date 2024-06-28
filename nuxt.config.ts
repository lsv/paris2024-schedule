// https://nuxt.com/docs/api/configuration/nuxt-config

import localeData from "dayjs/locale.json";

const locales: string[] = []
let allLocales = localeData.map((l) => l.key)
allLocales = allLocales.filter((l) => !l.includes('-'))
locales.push(...allLocales)

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "dayjs-nuxt",
    "@formkit/auto-animate",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@pinia-plugin-persistedstate/nuxt"
  ],
  dayjs: {
    locales: locales,
    plugins: ["timezone", "localizedFormat"],
    defaultTimezone: 'UTC',
    defaultLocale: 'en',
  },
})