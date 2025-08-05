<script setup lang="ts">
import CommonHeaderComponent from '@/components/CommonHeaderComponent.vue'
import BorrowedComponent from '@/components/BorrowedComponent.vue'
</script>

<template>
    <CommonHeaderComponent></CommonHeaderComponent>
    <main class="adjustment">
        <nav class="breadcrumb">
            <router-link to="/dashboard">ホーム</router-link>
        </nav>
        <div class="dashboard">
            <router-link :to="{ name: 'Book' }" class="nav-link">書籍管理へ</router-link>
        </div>
        <BorrowedComponent />
    </main>

</template>


<style scoped lang="scss"></style>