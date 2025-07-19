<script setup>
import { ref, provide, watch } from 'vue'
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
import LibraryRegistrationForm from './components/LibraryRegistrationForm.vue'

// 认证状态全局管理
const isAuthenticated = ref(false)
provide('isAuthenticated', isAuthenticated)
watch(isAuthenticated, (val) => {
  window.__isAuthenticated__ = val
})
window.__isAuthenticated__ = isAuthenticated.value
</script>

<template>
  <header class="container">
    <BHeader />
  </header>

  <main>
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */

.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}
</style>
