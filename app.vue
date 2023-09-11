<script lang="ts">

import "bootstrap/dist/css/bootstrap.min.css";
import { fetchWeather, fetchGeolocation, capitalize } from "./functions";
import type { GeolocationFields, WeatherFields } from "./types";
import {
    solDia,
    solNoite,
    chuvaDia,
    chuvaNoite,
    neveDia,
    neveNoite,
    nubladoDia,
    nubladoNoite
} from "./assets/assets";

export default {
    async mounted() {
        await this.getWeather();
    },
    data() {
        return {
            weather: {} as WeatherFields,
            geolocation: [] as GeolocationFields,

            cidade: "Canoas" as string,
            pais: "Brasil" as string,
            error: "" as string,

            cityNameClass: "" as string,
            tempClass: "" as string,
            weatherClass: "" as string,

            headerBsTheme: "dark" as "light" | "dark",

            display: true as boolean,

            imgSrc: "" as string
        };
    },
    methods: {
        async getWeather() {
            this.display = true;

            const reqGeolocation = await fetchGeolocation({
                appid: import.meta.env.VITE_API_KEY,
                q: `${this.cidade},${this.pais}`,
                limit: 1
            });

            if (reqGeolocation.data.length) {
                const geolocation: GeolocationFields = reqGeolocation.data;

                const response = await fetchWeather({
                    lat: geolocation[0].lat,
                    lon: geolocation[0].lon,
                    units: "metric",
                    lang: "pt_br",
                    appid: import.meta.env.VITE_API_KEY
                });

                if (response.status === 200) {
                    this.weather = response.data;
                    this.geolocation = geolocation;
                    this.imgSrc = `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`;
                    this.weather.weather[0].description = capitalize(
                        this.weather.weather[0].description
                    );
                    this.weather.main.temp = Math.round(this.weather.main.temp);
                    this.error = "";
                    this.display = false;

                    switch (response.data.weather[0].main) {
                        case "Thunderstorm": // Tempestade com raios
                            if (response.data.weather[0].icon.endsWith("d")) {
                                document.body.style.backgroundImage = `url(${chuvaDia})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "light"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            } else {
                                document.body.style.backgroundImage = `url(${chuvaNoite})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "dark"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-light";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            }
                            break;
                        case "Drizzle": // Chuvisco
                            if (response.data.weather[0].icon.endsWith("d")) {
                                document.body.style.backgroundImage = `url(${chuvaDia})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "light"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            } else {
                                document.body.style.backgroundImage = `url(${chuvaNoite})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "dark"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-light";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            }
                            break;
                        case "Rain": // Chuva
                            if (response.data.weather[0].icon.endsWith("d")) {
                                document.body.style.backgroundImage = `url(${chuvaDia})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "light"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            } else {
                                document.body.style.backgroundImage = `url(${chuvaNoite})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "dark"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-light";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            }
                            break;
                        case "Snow": // Neve
                            if (response.data.weather[0].icon.endsWith("d")) {
                                document.body.style.backgroundImage = `url(${neveDia})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "light"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-dark";
                                this.weatherClass = "text-light";
                            } else {
                                document.body.style.backgroundImage = `url(${neveNoite})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "dark"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            }
                            break;
                        case "Atmosphere": // Condições do ar
                            if (response.data.weather[0].icon.endsWith("d")) {
                                document.body.style.backgroundImage = `url(${nubladoDia})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "light"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            } else {
                                document.body.style.backgroundImage = `url(${nubladoNoite})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "dark"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-light";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            }
                            break;
                        case "Clear": // Sol
                            if (response.data.weather[0].icon.endsWith("d")) {
                                document.body.style.backgroundImage = `url(${solDia})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "light"
                                );
                                this.headerBsTheme = "light";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-dark";
                                this.weatherClass = "text-light";
                            } else {
                                document.body.style.backgroundImage = `url(${solNoite})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "dark"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-dark";
                                this.weatherClass = "text-dark";
                            }
                            break;
                        case "Clouds": // Nublado
                            if (response.data.weather[0].icon.endsWith("d")) {
                                document.body.style.backgroundImage = `url(${nubladoDia})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "light"
                                );
                                this.headerBsTheme = "light";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            } else {
                                document.body.style.backgroundImage = `url(${nubladoNoite})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "dark"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-light";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            }
                            break;
                        case "Mist":
                            if (response.data.weather[0].icon.endsWith("d")) {
                                document.body.style.backgroundImage = `url(${nubladoDia})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "light"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-dark";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            } else {
                                document.body.style.backgroundImage = `url(${nubladoNoite})`;

                                document.body.setAttribute(
                                    "data-bs-theme",
                                    "dark"
                                );
                                this.headerBsTheme = "dark";
                                this.cityNameClass = "text-light";
                                this.tempClass = "text-light";
                                this.weatherClass = "text-light";
                            }
                            break;
                    }
                } else {
                    this.error =
                        "Erro ao obter os dados metereológicos. Tente novamente mais tarde.";
                    this.display = false;
                }
            } else {
                this.error =
                    "Erro ao obter a cidade/país. Verifique se digitou corretamente.";
                this.display = false;
            }
        }
    }
};

</script>

<template>

<header class="navbar" :data-bs-theme="headerBsTheme">
    <nav class="container">
        <a href="/" class="navbar-brand">WeatherApp</a>
    </nav>
</header>

<main
    class="container mt-4 d-flex justify-content-center align-items-center flex-column"
>
    <h1 class="mb-5 text-center">Weather App Nuxt</h1>

    <form
        class="w-100 mb-5 d-flex justify-content-center"
        @submit.prevent="getWeather"
    >
        <div class="row m-0">
            <div class="col p-0 me-2">
                <label for="cidade" class="form-label ms-1 mb-1"
                    >Cidade</label
                >
                <input
                    type="text"
                    placeholder="Cidade"
                    id="cidade"
                    class="form-control"
                    v-model="cidade"
                />
            </div>
            <div class="col p-0 me-2">
                <label for="pais" class="ms-1 mb-1">País</label>
                <input
                    type="text"
                    placeholder="País"
                    id="pais"
                    class="form-control"
                    v-model="pais"
                />
            </div>
            <div class="col-1 p-0">
                <button
                    class="btn btn-primary"
                    type="submit"
                    style="margin-top: 28px"
                >
                    Enviar
                </button>
            </div>
        </div>
    </form>

    <p v-if="display">Obtendo clima...</p>

    <div
        v-if="!display && !error && weather && geolocation.length"
        class="weather w-100 d-flex justify-content-center align-items-center flex-column"
    >
        <h3 class="mb-4 mt-4" :class="cityNameClass">
            {{ geolocation[0].name }}, {{ geolocation[0].state }} -
            {{ geolocation[0].country }}
        </h3>
        <div class="row" style="width: 250px">
            <div
                class="col-5 d-flex justify-content-center align-items-center"
            >
                <img
                    :src="imgSrc"
                    :alt="weather.weather[0].description"
                    :title="weather.weather[0].description"
                />
            </div>
            <div
                class="col-6 pt-3 d-flex flex-column justify-content-center align-items-center"
            >
                <h2 class="fw-bold text-center" :class="tempClass">
                    {{ weather.main.temp }} °C
                </h2>
                <p class="text-center" :class="weatherClass">
                    {{ weather.weather[0].description }}
                </p>
            </div>
        </div>
    </div>

    <div v-if="error" class="alert alert-danger">
        {{ error }}
    </div>
</main>

</template>

<style>

@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

body {
    margin: 0;
    padding: 0;

    font-family: "Inter", Arial, Helvetica, sans-serif;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    height: 100vh;

    transition: background-image 0.5s ease;
}

@keyframes show {
    from {
        margin-top: -10px;
    }
    to {
        margin-top: 0;
    }
}

.weather {
    animation: show 0.3s;
}

</style>
