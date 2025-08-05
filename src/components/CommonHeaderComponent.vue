<script setup lang="ts">
import axios from '@/plugins/axios'
import router from '@/router'

async function logout() {
    try {
        await axios.post('/api/auth/logout')
        router.push('/login')
    } catch (error) {
        console.error('ログアウト失敗', error)
    }
}

</script>

<template>
    <header>
        <div class="adjustment">
            <div class="title">
                <h1>書籍管理システム</h1>
            </div>
            <div class="nav">
                <button class="logout" @click="logout()">ログアウト</button>
            </div>
        </div>
    </header>

</template>