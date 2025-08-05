<template>
    <form @submit.prevent="handleRegister">
        <input v-model="loginid" placeholder="ログインID" />
        <input v-model="name" placeholder="名前" />
        <input type="password" v-model="password" placeholder="パスワード" />
        <input type="password" v-model="confirmPassword" placeholder="パスワード再確認" />
        <button type="submit" class="login-button">新規登録</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios'

const loginid = ref('')
const password = ref('')
const confirmPassword = ref('')
const name = ref('')

const router = useRouter()

async function handleRegister() {
    if (password.value !== confirmPassword.value) {
        alert('パスワードが一致しません')
        return
    }

    try {
        await axios.post('/api/auth/register', {
            loginid: loginid.value,
            password: password.value,
            name: name.value,
        })
        alert('登録が完了しました。ログインしてください。')
        router.push('/login')
    } catch (error) {
        console.error(error)
        alert('登録に失敗しました')
    }
}
</script>