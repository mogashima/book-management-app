<template>
    <form @submit.prevent="handleLogin">
        <input v-model="loginid" placeholder="ログインID" />
        <input type="password" v-model="password" placeholder="パスワード" />
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit" class="login-button">ログイン</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const loginid = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

async function handleLogin() {
    errorMessage.value = ''
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
            loginid: loginid.value,
            password: password.value
        })
        localStorage.setItem('token', response.data.token)
        router.push('/dashboard')
    } catch (error: any) {
        if (error.response?.data?.message) {
            errorMessage.value = error.response.data.message
        } else {
            errorMessage.value = 'ログインに失敗しました'
        }
    }
}
</script>