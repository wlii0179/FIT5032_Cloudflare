<template>
  <div class="container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" style="max-width: 400px; margin: 0 auto;">
      <div class="mb-3">
        <label for="login-username" class="form-label">Username</label>
        <input type="text" class="form-control" id="login-username" v-model="username" />
      </div>
      <div class="mb-3">
        <label for="login-password" class="form-label">Password</label>
        <input type="password" class="form-control" id="login-password" v-model="password" />
      </div>
      <div v-if="error" class="text-danger mb-2">{{ error }}</div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
// 认证状态用 provide/inject 传递
const isAuthenticated = inject('isAuthenticated')

const handleLogin = () => {
  // 硬编码用户名和密码
  if (username.value === 'admin' && password.value === '123456') {
    isAuthenticated.value = true
    router.push('/about')
  } else {
    error.value = 'Invalid username or password.'
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 60px;
}
</style> 