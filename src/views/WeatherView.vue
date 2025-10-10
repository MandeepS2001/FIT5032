<template>
  <div class="weather-view-wrapper">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="weather-icon-circle">
          <span class="weather-hero-icon">🌤️</span>
          <div class="icon-pulse"></div>
        </div>
        <h1 class="hero-title">Weather Dashboard</h1>
        <p class="hero-subtitle">Check weather conditions anywhere in the world</p>
      </div>

      <!-- Main Weather Card -->
      <div class="weather-card glass-card">
        <!-- Search Section -->
        <div class="search-section">
          <div class="search-header">
            <span class="search-icon">🔍</span>
            <h2 class="search-title">Search Location</h2>
          </div>

          <div class="search-controls">
            <div class="search-input-wrapper">
              <span class="input-icon">📍</span>
              <input
                type="text"
                v-model="city"
                placeholder="Enter city name (e.g., Melbourne)"
                class="search-input"
                @keyup.enter="searchByCity"
              />
            </div>
            <button @click="searchByCity" class="search-btn">
              <span class="btn-icon">🔍</span>
              <span class="btn-text">Search</span>
            </button>
          </div>

          <div class="divider">
            <span class="divider-text">or</span>
          </div>

          <button @click="fetchCurrentLocationWeather" class="location-btn">
            <span class="btn-icon">📍</span>
            <span class="btn-text">Use My Location</span>
          </button>
        </div>

        <!-- Weather Display -->
        <transition name="weather-fade">
          <div v-if="weatherData" class="weather-display">
            <!-- Location Info -->
            <div class="location-header">
              <div class="location-icon-wrapper">
                <span class="location-icon">📍</span>
              </div>
              <div class="location-info">
                <h3 class="location-name">{{ weatherData.name }}</h3>
                <p class="location-country">{{ weatherData.sys.country }}</p>
              </div>
            </div>

            <!-- Main Weather Info -->
            <div class="weather-main">
              <div class="weather-icon-display">
                <img :src="iconUrl" alt="Weather Icon" class="weather-img" />
                <div class="weather-bg-gradient"></div>
              </div>
              <div class="weather-temp-section">
                <div class="temperature">{{ temperature }}°C</div>
                <div class="weather-description">{{ weatherData.weather[0].description }}</div>
              </div>
            </div>

            <!-- Weather Details Grid -->
            <div class="weather-details-grid">
              <div class="detail-card">
                <span class="detail-icon">💧</span>
                <div class="detail-content">
                  <div class="detail-value">{{ weatherData.main.humidity }}%</div>
                  <div class="detail-label">Humidity</div>
                </div>
              </div>
              <div class="detail-card">
                <span class="detail-icon">🌡️</span>
                <div class="detail-content">
                  <div class="detail-value">
                    {{ Math.floor(weatherData.main.feels_like - 273) }}°C
                  </div>
                  <div class="detail-label">Feels Like</div>
                </div>
              </div>
              <div class="detail-card">
                <span class="detail-icon">💨</span>
                <div class="detail-content">
                  <div class="detail-value">{{ weatherData.wind.speed }} m/s</div>
                  <div class="detail-label">Wind Speed</div>
                </div>
              </div>
              <div class="detail-card">
                <span class="detail-icon">🎈</span>
                <div class="detail-content">
                  <div class="detail-value">{{ weatherData.main.pressure }} hPa</div>
                  <div class="detail-label">Pressure</div>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Empty State -->
        <div v-if="!weatherData" class="empty-state">
          <span class="empty-icon">🌍</span>
          <h3 class="empty-title">No location selected</h3>
          <p class="empty-text">Search for a city or use your current location</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const apikey = 'b088bca9df98af06692cfc44fdae8d28'
const city = ref('')
const weatherData = ref(null)

const temperature = computed(() => {
  return weatherData.value ? Math.floor(weatherData.value.main.temp - 273) : null
})

const iconUrl = computed(() => {
  return weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}@4x.png`
    : null
})

const searchByCity = async () => {
  if (!city.value.trim()) return

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`
    const response = await axios.get(url)
    weatherData.value = response.data
  } catch (error) {
    alert('City not found. Please try again.')
    console.error('Error fetching weather data:', error)
  }
}

const fetchCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
        try {
          const response = await axios.get(url)
          weatherData.value = response.data
        } catch (error) {
          alert('Unable to fetch weather data for your location.')
          console.error('Error fetching weather data:', error)
        }
      },
      (error) => {
        alert('Please enable location access to use this feature.')
        console.error('Geolocation error:', error)
      },
    )
  } else {
    alert('Geolocation is not supported by your browser.')
  }
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>

<style scoped>
.weather-view-wrapper {
  min-height: 100vh;
  padding: 40px 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 50px 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.weather-icon-circle {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-hero-icon {
  font-size: 4rem;
  position: relative;
  z-index: 2;
  animation: float 3s ease-in-out infinite;
}

.icon-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse-scale 2s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-scale {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin: 0 0 15px 0;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Search Section */
.search-section {
  margin-bottom: 40px;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
}

.search-icon {
  font-size: 1.8rem;
}

.search-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.search-controls {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 20px;
  font-size: 1.3rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 16px 20px 16px 55px;
  border: 2px solid #e9ecef;
  border-radius: 15px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  font-family: inherit;
}

.search-input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
}

.search-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.5);
}

.btn-icon {
  font-size: 1.2rem;
}

.divider {
  position: relative;
  text-align: center;
  margin: 25px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e9ecef;
}

.divider-text {
  position: relative;
  display: inline-block;
  padding: 0 20px;
  background: rgba(255, 255, 255, 0.95);
  color: #6c757d;
  font-weight: 600;
  font-size: 0.9rem;
}

.location-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
}

.location-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.5);
}

/* Weather Display */
.weather-display {
  animation: fadeIn 0.6s ease;
}

.location-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 25px;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  border-radius: 16px;
  margin-bottom: 30px;
}

.location-icon-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
}

.location-icon {
  font-size: 1.8rem;
}

.location-info {
  flex: 1;
}

.location-name {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0 0 5px 0;
}

.location-country {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* Main Weather */
.weather-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 18px;
  margin-bottom: 30px;
}

.weather-icon-display {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 15px rgba(0, 0, 0, 0.2));
  animation: float 3s ease-in-out infinite;
}

.weather-bg-gradient {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.weather-temp-section {
  text-align: right;
}

.temperature {
  font-size: 5rem;
  font-weight: 800;
  color: #0ea5e9;
  line-height: 1;
  margin-bottom: 10px;
}

.weather-description {
  font-size: 1.5rem;
  color: #2c3e50;
  text-transform: capitalize;
  font-weight: 600;
}

/* Weather Details Grid */
.weather-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.detail-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 25px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 2px solid #f8f9fa;
  transition: all 0.3s ease;
}

.detail-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.15);
  border-color: #0ea5e9;
}

.detail-icon {
  font-size: 2rem;
}

.detail-content {
  flex: 1;
}

.detail-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1;
  margin-bottom: 5px;
}

.detail-label {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 5rem;
  display: block;
  margin-bottom: 20px;
  opacity: 0.3;
  animation: float 3s ease-in-out infinite;
}

.empty-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 10px 0;
}

.empty-text {
  font-size: 1.1rem;
  color: #6c757d;
  margin: 0;
}

/* Transitions */
.weather-fade-enter-active,
.weather-fade-leave-active {
  transition: all 0.5s ease;
}

.weather-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.weather-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .weather-view-wrapper {
    padding: 20px 0;
  }

  .hero-section {
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .glass-card {
    padding: 25px;
  }

  .search-controls {
    flex-direction: column;
  }

  .search-btn {
    width: 100%;
  }

  .weather-main {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }

  .weather-temp-section {
    text-align: center;
    margin-top: 20px;
  }

  .temperature {
    font-size: 4rem;
  }

  .weather-description {
    font-size: 1.2rem;
  }

  .weather-details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
