<template>
  <div class="register-view-wrapper">
    <div class="container">
      <!-- Hero Section -->
      <div class="auth-hero">
        <div class="hero-icon-wrapper">
          <span class="hero-icon">🔐</span>
          <div class="icon-pulse"></div>
        </div>
        <h1 class="hero-title">Create Account</h1>
        <p class="hero-subtitle">Join MDAN Library Management System</p>
      </div>

      <!-- Registration Card -->
      <div class="auth-card glass-card">
        <div class="card-header">
          <div class="header-icon-wrapper">
            <span class="header-icon">✨</span>
          </div>
          <div class="header-text">
            <h2 class="card-title">Sign Up</h2>
            <p class="card-subtitle">Create your new account</p>
          </div>
        </div>

        <form @submit.prevent="register" class="auth-form">
          <div class="form-group">
            <label for="email" class="form-label">
              <span class="label-icon">📧</span>
              <span>Email Address</span>
            </label>
            <div class="input-wrapper">
              <span class="input-icon">@</span>
              <input
                type="email"
                v-model="email"
                id="email"
                required
                class="form-input"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">
              <span class="label-icon">🔒</span>
              <span>Password</span>
            </label>
            <div class="input-wrapper">
              <span class="input-icon">🔑</span>
              <input
                type="password"
                v-model="password"
                id="password"
                required
                class="form-input"
                placeholder="Enter your password"
                minlength="6"
              />
            </div>
            <p class="input-hint">Password must be at least 6 characters</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="submit-btn"
            :class="{ loading: loading }"
          >
            <span v-if="!loading" class="btn-icon">🚀</span>
            <span v-else class="btn-icon spinner">⏳</span>
            <span>{{ loading ? 'Creating Account...' : 'Create Account' }}</span>
          </button>
        </form>

        <!-- Messages -->
        <transition name="slide-fade">
          <div v-if="errorMessage" class="message-box error">
            <div class="message-icon">⚠️</div>
            <div class="message-content"><strong>Error:</strong> {{ errorMessage }}</div>
            <button @click="errorMessage = ''" class="close-btn">×</button>
          </div>
        </transition>

        <transition name="slide-fade">
          <div v-if="successMessage" class="message-box success">
            <div class="message-icon">✅</div>
            <div class="message-content"><strong>Success!</strong> {{ successMessage }}</div>
          </div>
        </transition>

        <!-- Sign In Link -->
        <div class="auth-footer">
          <p class="footer-text">
            Already have an account?
            <router-link to="/FireSignin" class="auth-link">Sign In</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const register = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const auth = getAuth()
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)

    console.log('User registered:', userCredential.user)
    successMessage.value = 'Account created successfully! Redirecting...'

    // Redirect to sign in page after 2 seconds
    setTimeout(() => {
      router.push('/FireSignin')
    }, 2000)
  } catch (error) {
    console.error('Registration error:', error)

    // Handle specific error codes
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage.value = 'This email is already registered. Please sign in instead.'
        break
      case 'auth/invalid-email':
        errorMessage.value = 'Please enter a valid email address.'
        break
      case 'auth/weak-password':
        errorMessage.value = 'Password is too weak. Please use at least 6 characters.'
        break
      default:
        errorMessage.value = error.message
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-view-wrapper {
  min-height: 100vh;
  padding: 40px 0;
  display: flex;
  align-items: center;
}

.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* Hero Section */
.auth-hero {
  text-align: center;
  margin-bottom: 30px;
  padding: 40px 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-icon {
  font-size: 3rem;
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
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin: 0 0 10px 0;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 30px;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  color: white;
}

.header-icon-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}

.header-icon {
  font-size: 1.8rem;
}

.card-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 5px 0;
}

.card-subtitle {
  font-size: 0.95rem;
  opacity: 0.9;
  margin: 0;
}

/* Form */
.auth-form {
  padding: 35px 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #0f172a;
  font-size: 1rem;
}

.label-icon {
  font-size: 1.1rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #64748b;
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 14px 20px 14px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.1);
}

.input-hint {
  margin: 8px 0 0 0;
  font-size: 0.85rem;
  color: #64748b;
}

.submit-btn {
  width: 100%;
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
  margin-top: 10px;
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
  margin-top: 20px;
  padding: 16px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease;
}

.message-box.error {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border: 2px solid #dc2626;
  color: #991b1b;
}

.message-box.success {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  border: 2px solid #10b981;
  color: #065f46;
}

.message-icon {
  font-size: 1.3rem;
}

.message-content {
  flex: 1;
  font-size: 0.95rem;
}

.close-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  color: inherit;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

/* Footer */
.auth-footer {
  padding: 25px 30px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  text-align: center;
}

.footer-text {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

.auth-link {
  color: #0ea5e9;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.auth-link:hover {
  color: #f97316;
  text-decoration: underline;
}

/* Animations */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .register-view-wrapper {
    padding: 20px 0;
  }

  .auth-hero {
    padding: 30px 20px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .auth-form {
    padding: 25px 20px;
  }

  .auth-footer {
    padding: 20px;
  }
}
</style>
