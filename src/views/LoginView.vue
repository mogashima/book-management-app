<script setup lang="ts">
import { ref } from 'vue'
import LoginComponent from '@/components/LoginComponent.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'
const activeTab = ref<'login' | 'register'>('login')
</script>

<template>
    <main>
        <div class="login-view">
            <h1 class="login-title">書籍管理システム</h1>

            <!-- タブ -->
            <div class="tabs">
                <div :class="['tab', { active: activeTab === 'login' }]" @click="activeTab = 'login'">
                    ログイン
                </div>
                <div :class="['tab', { active: activeTab === 'register' }]" @click="activeTab = 'register'">
                    新規登録
                </div>
            </div>

            <!-- 内容 -->
            <div class="tab-content">
                <LoginComponent v-if="activeTab === 'login'" />
                <RegisterComponent v-else />
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
.tabs {
    display: flex;

    .tab {
        flex: 1;
        text-align: center;
        padding: 0.75em;
        cursor: pointer;
        border: 1px solid #ccc;
        border-bottom: none;
        background-color: #fff;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;

        &.active {
            background-color: #f1f1f1f1;
            font-weight: bold;
            border-bottom: 2px solid #f1f1f1f1;
        }
    }
}

.tab-content {
    padding: 2em 1.5em;
    background: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
}
</style>