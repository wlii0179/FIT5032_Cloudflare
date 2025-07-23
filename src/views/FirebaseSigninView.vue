<template>
  <h1>Firebase Login</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button @click="login">Sign In</button></p>
  <div v-if="currentRole">
    <p style="color: #42b983; font-weight: bold;">Current Role: {{ currentRole }}</p>
  </div>
</template>

<script setup>
import { ref, inject } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"
const email = ref("")
const password = ref("")
const currentRole = ref("")
const router = useRouter()
const auth = getAuth()
const isAuthenticated = inject('isAuthenticated')
const login = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      // 登录成功后读取角色
      currentRole.value = localStorage.getItem('userRole') || 'user'
      if (isAuthenticated) isAuthenticated.value = true
      console.log("Firebase Login Successful!")
      console.log(getAuth().currentUser)
      console.log("Current Role:", currentRole.value)
      router.push("/")
    }).catch((error) => {
      alert(error.message)
    })
}
</script>