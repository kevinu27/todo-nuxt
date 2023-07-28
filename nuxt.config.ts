// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        "@nuxtjs/google-fonts",
      ],
    googleFonts: {
        families: {
            'Roboto': [400, 500, 600, 700],
        },
    },
})
