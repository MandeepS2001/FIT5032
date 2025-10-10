<template>
  <div class="navbar-container">
    <nav class="navbar">
      <!-- Logo & Brand -->
      <div class="nav-brand">
        <div class="brand-logo">
          <span class="logo-icon">📚</span>
          <div class="logo-glow"></div>
        </div>
        <div class="brand-info">
          <span class="brand-title">MDAN Library</span>
          <span class="brand-subtitle">Book Management</span>
        </div>
      </div>

      <!-- Navigation Menu -->
      <ul class="nav-menu">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            <div class="nav-link-bg"></div>
            <i class="nav-icon">🏠</i>
            <span class="nav-text">Home</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetBookCount" class="nav-link" active-class="active">
            <div class="nav-link-bg"></div>
            <i class="nav-icon">📊</i>
            <span class="nav-text">Stats</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">
            <div class="nav-link-bg"></div>
            <i class="nav-icon">🌤️</i>
            <span class="nav-text">Weather</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">
            <div class="nav-link-bg"></div>
            <i class="nav-icon">📈</i>
            <span class="nav-text">API Count</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">
            <div class="nav-link-bg"></div>
            <i class="nav-icon">📚</i>
            <span class="nav-text">All Books</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">
            <div class="nav-link-bg"></div>
            <i class="nav-icon">✨</i>
            <span class="nav-text">Register</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireSignin" class="nav-link" active-class="active">
            <div class="nav-link-bg"></div>
            <i class="nav-icon">🔐</i>
            <span class="nav-text">Sign In</span>
            <div class="nav-indicator"></div>
          </router-link>
        </li>
      </ul>

      <!-- Mobile Menu Toggle (for future use) -->
      <button class="mobile-menu-btn" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </div>
</template>

<script setup>
// Navigation component
</script>

<style scoped>
.navbar-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  position: relative;
}

/* Brand Section */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
}

.brand-logo {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
  transition: all 0.3s ease;
}

.brand-logo:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(249, 115, 22, 0.5);
}

.logo-icon {
  font-size: 1.8rem;
  position: relative;
  z-index: 1;
  animation: float 3s ease-in-out infinite;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse-glow 2s ease-in-out infinite;
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  line-height: 1;
}

.brand-subtitle {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
}

.nav-item {
  margin: 0;
}

.nav-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  z-index: 1;
}

.nav-link-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  border-radius: 8px;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: -1;
}

.nav-link:hover .nav-link-bg {
  opacity: 1;
}

.nav-icon {
  font-size: 1.2rem;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.nav-text {
  transition: all 0.3s ease;
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, transparent, white, transparent);
  border-radius: 3px 3px 0 0;
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: white;
  transform: translateY(-2px);
}

.nav-link:hover .nav-icon {
  transform: scale(1.15) rotate(5deg);
}

.nav-link:hover .nav-indicator {
  transform: translateX(-50%) scaleX(1);
}

.nav-link.active {
  color: white;
  background: linear-gradient(135deg, #f97316 0%, #fb923c 100%);
  box-shadow: 0 4px 20px rgba(249, 115, 22, 0.4);
}

.nav-link.active .nav-link-bg {
  opacity: 1;
}

.nav-link.active .nav-icon {
  transform: scale(1.1);
  animation: bounce-icon 0.6s ease;
}

.nav-link.active .nav-indicator {
  transform: translateX(-50%) scaleX(1);
  background: linear-gradient(90deg, transparent, #fbbf24, transparent);
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mobile-menu-btn span {
  width: 25px;
  height: 2px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
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

@keyframes bounce-icon {
  0%,
  100% {
    transform: scale(1.1) translateY(0);
  }
  50% {
    transform: scale(1.1) translateY(-5px);
  }
}

/* Responsive Design */
@media (max-width: 968px) {
  .navbar {
    padding: 12px 20px;
  }

  .nav-menu {
    gap: 5px;
  }

  .nav-link {
    padding: 10px 16px;
    gap: 8px;
  }

  .brand-title {
    font-size: 1.2rem;
  }

  .brand-subtitle {
    font-size: 0.7rem;
  }
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }

  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 8px;
    padding: 20px;
    background: rgba(102, 126, 234, 0.98);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: none;
  }

  .nav-link {
    justify-content: center;
    padding: 14px 20px;
  }

  .nav-text {
    font-size: 1rem;
  }

  .brand-logo {
    width: 45px;
    height: 45px;
  }

  .logo-icon {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .navbar {
    padding: 10px 15px;
  }

  .brand-info {
    display: none;
  }

  .nav-link .nav-text {
    display: none;
  }

  .nav-link {
    padding: 12px;
    min-width: 48px;
    justify-content: center;
  }

  .nav-icon {
    font-size: 1.4rem;
  }
}
</style>
