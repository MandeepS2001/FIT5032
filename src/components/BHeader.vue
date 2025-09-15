<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home (Week 7)</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>

        <!-- Conditional rendering based on authentication status -->
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item" v-else>
          <button @click="handleLogout" class="nav-link btn btn-link">
            Logout ({{ currentUser }})
          </button>
        </li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuthenticated = ref(false);
const currentUser = ref('');

onMounted(() => {
  checkAuthStatus();
});

const checkAuthStatus = () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';
  currentUser.value = localStorage.getItem('currentUser') || '';
};

const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('currentUser');
  isAuthenticated.value = false;
  currentUser.value = '';
  router.push('/login');
};
</script>

<style scoped>
.nav-pills .nav-link.active {
  background-color: #0d6efd;
  color: white;
}

.nav-pills .nav-link {
  color: #0d6efd;
  margin: 0 5px;
}

.nav-pills .nav-link:hover {
  background-color: #e9ecef;
}

.btn-link {
  text-decoration: none;
  background: none;
  border: none;
  color: #0d6efd;
  padding: 0.5rem 1rem;
}

.btn-link:hover {
  background-color: #e9ecef;
  color: #0d6efd;
}
</style>
