<script setup>
import BHeader from './components/BHeader.vue'
</script>

<template>
  <div id="app" class="app-wrapper">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
    </div>

    <!-- Header Navigation - Now on all pages -->
    <header class="app-header">
      <BHeader />
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <transition name="page-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>

    <!-- Footer - Now on all pages -->
    <footer class="app-footer">
      <div class="footer-content">
        <p class="footer-text">
          <span class="footer-icon">📚</span>
          Library Management System © {{ new Date().getFullYear() }}
        </p>
        <p class="footer-tagline">Built with ❤️ using Vue.js & Firebase</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

/* Animated Background */
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #14b8a6 100%);
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(80px);
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #f97316 0%, #fb923c 100%);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.shape-2 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, #14b8a6 0%, #10b981 100%);
  bottom: -300px;
  right: -300px;
  animation-delay: 5s;
}

.shape-3 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #0284c7 0%, #0891b2 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}

/* Header */
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

/* Main Content */
.main-content {
  flex: 1;
  position: relative;
  z-index: 1;
  padding: 20px 0;
  animation: fadeIn 0.6s ease-out;
}

/* Page Transitions */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: all 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Footer */
.app-footer {
  position: relative;
  z-index: 1;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  margin: 0 0 8px 0;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.footer-icon {
  font-size: 1.3rem;
  animation: pulse 2s infinite;
}

.footer-tagline {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 400;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    padding: 15px 0;
  }

  .footer-text {
    font-size: 0.9rem;
  }

  .footer-tagline {
    font-size: 0.8rem;
  }
}
</style>
