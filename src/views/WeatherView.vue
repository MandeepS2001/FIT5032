<template>
    <div>
        <h1>Weather App - Current Location</h1>
        <div>
            <input type="text" v-model="city" placeholder="Enter city name" />
            <button @click="searchByCity">Search</button>
        </div>
        <div>
            <button @click="fetchCurrentLocationWeather">Get Current Location Weather</button>
        </div>

        <div v-if="weatherData">
            <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
            <div>
                <img :src="iconUrl" alt="Weather Icon" />
                <p>{{ temperature }} °C</p>
            </div>
            <span>{{ weatherData.weather[0].description }}</span>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from "axios"

// Replace with your actual API key from https://openweathermap.org/api
const apikey = "b088bca9df98af06692cfc44fdae8d28"

const city = ref("")
const weatherData = ref(null)

const temperature = computed(() => {
    return weatherData.value ? Math.floor(weatherData.value.main.temp - 273) : null
})

const iconUrl = computed(() => {
    return weatherData.value ? `https://openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png` : null
})

const searchByCity = async () => {
    if (!city.value.trim()) return

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`
        const response = await axios.get(url)
        weatherData.value = response.data
    } catch (error) {
        console.error("Error fetching weather data:", error)
    }
}

const fetchCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
            try {
                const response = await axios.get(url)
                weatherData.value = response.data
            } catch (error) {
                console.error("Error fetching weather data:", error)
            }
        })
    }
}

onMounted(() => {
    fetchCurrentLocationWeather()
})
</script>