// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-05-06",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "World of Sofia",
      meta: [
        {
          name: "description",
          content: "A Nuxt showroom for isolated philosopher-derived skills."
        }
      ]
    }
  },
  nitro: {
    preset: "cloudflare_module",
    cloudflare: {
      nodeCompat: true
    }
  }
});
