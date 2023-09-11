// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    devtools: { enabled: true },
    app: {
        head: {
            title: "WeatherApp Nuxt",
            link: [
                {
                    rel: "icon",
                    href: "/favicon.png"
                }
            ],
            bodyAttrs: {
                "data-bs-theme": "dark"
            }
        }
    }
});
