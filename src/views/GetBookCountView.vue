<template>
  <div class="count-view-wrapper">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero-banner">
        <div class="banner-icon-wrapper">
          <span class="banner-icon">📊</span>
          <div class="icon-rings"></div>
        </div>
        <h1 class="banner-title">Book Statistics</h1>
        <p class="banner-subtitle">View your library collection statistics</p>
      </div>

      <!-- Main Card -->
      <div class="stats-card glass-card">
        <div class="card-header">
          <div class="header-decoration">
            <span class="decoration-icon">📈</span>
          </div>
          <div>
            <h2 class="card-title">Total Books Counter</h2>
            <p class="card-description">Get real-time book count from your library</p>
          </div>
        </div>

        <div class="card-body">
          <!-- Action Button -->
          <button
            @click="getBookCount"
            class="count-button"
            :class="{ loading: loading }"
            :disabled="loading"
          >
            <span v-if="!loading" class="btn-icon">🔄</span>
            <span v-else class="btn-icon spinner">⏳</span>
            <span class="btn-text">{{ loading ? 'Fetching...' : 'Get Book Count' }}</span>
          </button>

          <!-- Result Display -->
          <transition name="fade-scale">
            <div v-if="count !== null" class="result-display">
              <div class="result-card">
                <div class="result-icon-wrapper">
                  <span class="result-icon">📚</span>
                  <div class="result-glow"></div>
                </div>
                <div class="result-content">
                  <div class="result-label">Total Books</div>
                  <div class="result-value">{{ count }}</div>
                  <div class="result-meta">{{ count === 1 ? 'book' : 'books' }} in collection</div>
                </div>
              </div>
            </div>
          </transition>

          <!-- Error Display -->
          <transition name="fade-scale">
            <div v-if="error" class="error-display">
              <div class="error-icon">⚠️</div>
              <div class="error-message"><strong>Error:</strong> {{ error }}</div>
            </div>
          </transition>
        </div>

        <!-- Info Section -->
        <div class="info-section">
          <div class="info-item">
            <span class="info-icon">💡</span>
            <span class="info-text">Powered by Firebase Cloud Functions</span>
          </div>
          <div class="info-item">
            <span class="info-icon">⚡</span>
            <span class="info-text">Real-time synchronization</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      count: null,
      error: null,
      loading: false,
    }
  },
  methods: {
    async getBookCount() {
      this.loading = true
      this.error = null
      this.count = null

      try {
        const res = await axios.get(
          'https://us-central1-light-lambda-468509-m8.cloudfunctions.net/countBooks',
        )
        this.count = res.data.count
      } catch (e) {
        this.error = 'Failed to fetch book count. Please try again.'
        console.error('Error:', e)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.count-view-wrapper {
  min-height: 100vh;
  padding: 40px 0;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Banner */
.hero-banner {
  text-align: center;
  margin-bottom: 40px;
  padding: 50px 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.banner-icon-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-icon {
  font-size: 3.5rem;
  position: relative;
  z-index: 2;
  animation: float 3s ease-in-out infinite;
}

.icon-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: pulse-ring 2s ease-in-out infinite;
}

.icon-rings::before,
.icon-rings::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.icon-rings::before {
  width: 120%;
  height: 120%;
  animation: pulse-ring 2s ease-in-out 0.2s infinite;
}

.icon-rings::after {
  width: 140%;
  height: 140%;
  animation: pulse-ring 2s ease-in-out 0.4s infinite;
}

@keyframes pulse-ring {
  0%,
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1.1);
  }
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

.banner-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin: 0 0 15px 0;
}

.banner-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 35px 40px;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  color: white;
}

.header-decoration {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.decoration-icon {
  font-size: 2rem;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.card-description {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
}

/* Card Body */
.card-body {
  padding: 50px 40px;
  text-align: center;
}

/* Count Button */
.count-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 40px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);
  min-width: 250px;
}

.count-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(249, 115, 22, 0.5);
}

.count-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.5rem;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Result Display */
.result-display {
  margin-top: 40px;
}

.result-card {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 35px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  border: 2px solid #0ea5e9;
  box-shadow: 0 8px 25px rgba(14, 165, 233, 0.15);
}

.result-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
}

.result-icon {
  font-size: 2.5rem;
  position: relative;
  z-index: 1;
}

.result-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
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

.result-content {
  flex: 1;
  text-align: left;
}

.result-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 8px;
}

.result-value {
  font-size: 3.5rem;
  font-weight: 800;
  color: #0ea5e9;
  line-height: 1;
  margin-bottom: 8px;
}

.result-meta {
  font-size: 1rem;
  color: #6c757d;
}

/* Error Display */
.error-display {
  margin-top: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  border: 2px solid #dc3545;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #721c24;
}

.error-icon {
  font-size: 2rem;
}

.error-message {
  flex: 1;
  text-align: left;
  font-size: 1rem;
}

/* Info Section */
.info-section {
  padding: 30px 40px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #6c757d;
  font-size: 0.95rem;
}

.info-icon {
  font-size: 1.3rem;
}

/* Transitions */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s ease;
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .count-view-wrapper {
    padding: 20px 0;
  }

  .hero-banner {
    padding: 40px 20px;
  }

  .banner-title {
    font-size: 2.2rem;
  }

  .card-header,
  .card-body,
  .info-section {
    padding: 25px 20px;
  }

  .result-card {
    flex-direction: column;
    text-align: center;
    padding: 25px;
  }

  .result-content {
    text-align: center;
  }

  .info-section {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .count-button {
    width: 100%;
  }
}
</style>
