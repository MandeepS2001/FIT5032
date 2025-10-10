<template>
  <div class="home-wrapper">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero-section fade-in">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">✨</span>
            <span class="badge-text">Digital Library Platform</span>
          </div>
          <h1 class="hero-title">
            Welcome to
            <span class="gradient-text">MDAN Library</span>
          </h1>
          <p class="hero-description">
            Manage your book collection with ease. Add new books, track your library, and explore
            our comprehensive management system.
          </p>
          <div class="hero-stats">
            <div class="stat-card">
              <div class="stat-icon">📚</div>
              <div class="stat-content">
                <div class="stat-value">{{ books.length }}</div>
                <div class="stat-label">Books</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <div class="stat-value">100%</div>
                <div class="stat-label">Synced</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⚡</div>
              <div class="stat-content">
                <div class="stat-value">Real-time</div>
                <div class="stat-label">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Book Section -->
      <div class="add-book-section glass-card fade-in">
        <div class="section-header">
          <div class="section-title-wrapper">
            <div class="section-icon-wrapper">
              <span class="section-icon">➕</span>
            </div>
            <div>
              <h2 class="section-title">Add New Book</h2>
              <p class="section-subtitle">Expand your library collection</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="addBook" class="book-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="isbn" class="form-label">
                <span class="label-icon">🔢</span>
                <span>ISBN Number</span>
              </label>
              <div class="input-wrapper">
                <input
                  type="number"
                  v-model="isbn"
                  id="isbn"
                  required
                  class="form-input"
                  placeholder="Enter 13-digit ISBN"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="name" class="form-label">
                <span class="label-icon">📖</span>
                <span>Book Title</span>
              </label>
              <div class="input-wrapper">
                <input
                  type="text"
                  v-model="name"
                  id="name"
                  required
                  class="form-input"
                  placeholder="Enter book title"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="submit-btn"
            :class="{ loading: loading }"
          >
            <span v-if="!loading" class="btn-icon">✨</span>
            <span v-else class="btn-icon spinner">⏳</span>
            <span>{{ loading ? 'Adding Book...' : 'Add Book to Library' }}</span>
          </button>
        </form>

        <!-- Success/Error Messages -->
        <transition name="slide-fade">
          <div v-if="message" class="message-box" :class="messageType">
            <div class="message-header">
              <div class="message-icon-wrapper">
                <span class="message-icon">{{ messageType === 'success' ? '✅' : '❌' }}</span>
              </div>
              <span class="message-text">{{ message }}</span>
              <button @click="message = ''" class="close-btn">×</button>
            </div>

            <div v-if="capitalizationInfo" class="book-details">
              <div class="detail-row">
                <span class="detail-label">Original Name:</span>
                <span class="detail-value">{{ capitalizationInfo.originalName }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Formatted Name:</span>
                <span class="detail-value highlight">{{ capitalizationInfo.capitalizedName }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Book ID:</span>
                <span class="detail-value code">{{ capitalizationInfo.id }}</span>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Book List Section -->
      <div class="book-list-wrapper fade-in">
        <BookList :key="bookListKey" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BookList from '@/components/BookList.vue'
import db from '../firebase/init'
import { collection, getDocs } from 'firebase/firestore'

const isbn = ref('')
const name = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref('')
const capitalizationInfo = ref(null)
const books = ref([])
const bookListKey = ref(0)

const fetchBooks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'books'))
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })
    books.value = booksArray
  } catch (e) {
    console.error('Error fetching books:', e)
  }
}

const addBook = async () => {
  loading.value = true
  message.value = ''
  capitalizationInfo.value = null

  try {
    const response = await fetch(
      'https://us-central1-light-lambda-468509-m8.cloudfunctions.net/addBook',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isbn: Number(isbn.value),
          name: name.value,
        }),
      },
    )

    const result = await response.json()

    if (response.ok) {
      message.value = result.message
      messageType.value = 'success'
      capitalizationInfo.value = {
        originalName: result.originalName,
        capitalizedName: result.capitalizedName,
        id: result.id,
      }
      isbn.value = ''
      name.value = ''
      await fetchBooks()
      bookListKey.value++

      // Auto-hide message after 5 seconds
      setTimeout(() => {
        message.value = ''
      }, 5000)
    } else {
      message.value = result.message || 'Error adding book'
      messageType.value = 'error'
    }
  } catch (error) {
    message.value = 'Network error: ' + error.message
    messageType.value = 'error'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: 50px;
  padding: 60px 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.badge-icon {
  font-size: 1.2rem;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
  line-height: 1.1;
}

.gradient-text {
  background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.hero-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  text-align: left;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 40px;
}

/* Section Header */
.section-header {
  margin-bottom: 35px;
}

.section-title-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}

.section-icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
}

.section-icon {
  font-size: 1.8rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 5px 0;
}

.section-subtitle {
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
}

/* Form */
.book-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
}

.label-icon {
  font-size: 1.2rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
  transform: translateY(-2px);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.5);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 1.3rem;
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

/* Message Box */
.message-box {
  margin-top: 25px;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid;
  animation: slideIn 0.3s ease;
}

.message-box.success {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border-color: #28a745;
  color: #155724;
}

.message-box.error {
  background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
  border-color: #dc3545;
  color: #721c24;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.message-icon-wrapper {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
}

.message-icon {
  font-size: 1.3rem;
}

.message-text {
  flex: 1;
  font-weight: 600;
  font-size: 1rem;
}

.close-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

.book-details {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.detail-label {
  font-weight: 600;
  font-size: 0.9rem;
}

.detail-value {
  font-size: 0.95rem;
  font-weight: 500;
}

.detail-value.highlight {
  color: #0ea5e9;
  font-weight: 600;
}

.detail-value.code {
  font-family: 'Courier New', monospace;
  background: rgba(0, 0, 0, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.85rem;
}

/* Animations */
.fade-in {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .home-wrapper {
    padding: 20px 0;
  }

  .hero-section {
    padding: 40px 20px;
    margin-bottom: 30px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .hero-stats {
    flex-direction: column;
    align-items: stretch;
  }

  .stat-card {
    justify-content: center;
  }

  .glass-card {
    padding: 25px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .section-title-wrapper {
    gap: 15px;
  }

  .section-icon-wrapper {
    width: 50px;
    height: 50px;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
