<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <select v-model="role">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  </p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"
const email = ref("")
const password = ref("")
const role = ref("user")
const router = useRouter()
const auth = getAuth()
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      // 注册成功后将角色信息存入 localStorage
      localStorage.setItem('userRole', role.value)
      console.log("Firebase Register Successful! Role:", role.value)
      console.log(getAuth().currentUser)
      router.push("/FireLogin")
    }).catch((error) => {
      alert(error.message)
    })
}
</script>