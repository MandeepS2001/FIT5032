<template>
  <div class="api-view-wrapper">
    <div class="api-container">
      <!-- Header -->
      <div class="api-header">
        <div class="header-content">
          <div class="header-icon-wrapper">
            <span class="header-icon">📈</span>
            <div class="icon-ripple"></div>
          </div>
          <div class="header-text">
            <h1 class="api-title">Count Book API</h1>
            <p class="api-subtitle">Firebase Cloud Function Response</p>
          </div>
        </div>
        <button @click="getBookCountAPI" class="refresh-btn" :disabled="loading">
          <span class="btn-icon" :class="{ spinning: loading }">🔄</span>
          <span>{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
        </button>
      </div>

      <!-- API Info Card -->
      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Endpoint:</span>
          <code class="info-value">GET /countBooks</code>
        </div>
        <div class="info-row">
          <span class="info-label">Status:</span>
          <span class="status-badge" :class="statusClass">{{ statusText }}</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loader-wrapper">
          <div class="loader"></div>
          <p class="loading-text">Fetching data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">⚠️</div>
        <h3 class="error-title">Request Failed</h3>
        <p class="error-message">{{ error.message || error }}</p>
        <button @click="getBookCountAPI" class="retry-btn">
          <span class="btn-icon">🔄</span>
          <span>Try Again</span>
        </button>
      </div>

      <!-- Data Display -->
      <div v-else-if="jsondata" class="data-container">
        <!-- Visual Display -->
        <div class="result-card">
          <div class="result-icon-circle">
            <span class="result-icon">📚</span>
          </div>
          <div class="result-content">
            <div class="result-label">Total Books</div>
            <div class="result-value">{{ jsondata.count }}</div>
          </div>
        </div>

        <!-- JSON Viewer -->
        <div class="json-viewer">
          <div class="viewer-header">
            <span class="viewer-icon">📄</span>
            <span class="viewer-title">Raw JSON Response</span>
            <button @click="copyToClipboard" class="copy-btn">
              <span class="copy-icon">{{ copied ? '✅' : '📋' }}</span>
              <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
            </button>
          </div>
          <pre class="json-content">{{ formattedJson }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const error = ref(null)
const loading = ref(false)
const copied = ref(false)

const statusClass = computed(() => {
  if (loading.value) return 'status-loading'
  if (error.value) return 'status-error'
  if (jsondata.value) return 'status-success'
  return 'status-idle'
})

const statusText = computed(() => {
  if (loading.value) return 'Loading...'
  if (error.value) return 'Error'
  if (jsondata.value) return 'Success'
  return 'Idle'
})

const formattedJson = computed(() => {
  return jsondata.value ? JSON.stringify(jsondata.value, null, 2) : ''
})

const getBookCountAPI = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(
      'https://us-central1-light-lambda-468509-m8.cloudfunctions.net/countBooks',
    )
    jsondata.value = response.data
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = err
    jsondata.value = null
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(formattedJson.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

onMounted(() => {
  getBookCountAPI()
})
</script>

<style scoped>
.api-view-wrapper {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #14b8a6 100%);
}

.api-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Header */
.api-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon-wrapper {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
}

.header-icon {
  font-size: 2rem;
  position: relative;
  z-index: 1;
}

.icon-ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  animation: ripple 2s ease-in-out infinite;
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.header-text {
  color: white;
}

.api-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 5px 0;
}

.api-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.2rem;
}

.spinning {
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

/* Info Card */
.info-card {
  padding: 25px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 18px;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.info-row {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-label {
  font-weight: 600;
  color: #2c3e50;
  min-width: 100px;
}

.info-value {
  padding: 6px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  color: #0ea5e9;
  font-size: 0.95rem;
}

.status-badge {
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.status-success {
  background: #d4edda;
  color: #155724;
}

.status-error {
  background: #f8d7da;
  color: #721c24;
}

.status-loading {
  background: #fff3cd;
  color: #856404;
}

.status-idle {
  background: #e9ecef;
  color: #495057;
}

/* Loading */
.loading-container {
  padding: 80px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 18px;
}

.loader-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0ea5e9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 1.1rem;
  color: #6c757d;
  font-weight: 500;
}

/* Error */
.error-container {
  padding: 60px 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 18px;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.error-title {
  font-size: 1.8rem;
  color: #dc3545;
  margin: 0 0 15px 0;
}

.error-message {
  font-size: 1.1rem;
  color: #6c757d;
  margin-bottom: 30px;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 28px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.5);
}

/* Data Container */
.data-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* Result Card */
.result-card {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.result-icon-circle {
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
}

.result-content {
  flex: 1;
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
}

/* JSON Viewer */
.json-viewer {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.viewer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 25px;
  background: #2c3e50;
  color: white;
}

.viewer-icon {
  font-size: 1.3rem;
}

.viewer-title {
  flex: 1;
  font-weight: 600;
  font-size: 1.1rem;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.copy-icon {
  font-size: 1rem;
}

.json-content {
  padding: 25px;
  margin: 0;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Courier New', Consolas, monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  overflow-x: auto;
}

/* Responsive */
@media (max-width: 768px) {
  .api-view-wrapper {
    padding: 20px 15px;
  }

  .api-header {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  .header-content {
    gap: 15px;
  }

  .refresh-btn {
    width: 100%;
    justify-content: center;
  }

  .result-card {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
