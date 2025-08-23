<template>
  <div class="about">
    <!-- Bootstrap Header -->
    <BHeader />
    
    <div class="container mt-4">
      <h1>About Our Library</h1>
      <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
    </div>
  </div>
</template>

<script setup>
import BHeader from '../components/BHeader.vue';
</script>

<style>
.about {
  min-height: 100vh;
}

.about h1 {
  color: #333;
  margin-bottom: 1rem;
}

.about p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}
</style>
