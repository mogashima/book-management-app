<script setup lang="ts">
import { ref } from 'vue'
import BookFormComponent from '@/components/BookFormComponent.vue'
import BookListComponent from '@/components/BookListComponent.vue'
import CommonHeaderComponent from '@/components/CommonHeaderComponent.vue'

const showForm = ref(false)
const refreshKey = ref(0)

const openForm = () => {
    showForm.value = true
}

const closeForm = () => {
    showForm.value = false
}

const onBookAdded = () => {
    showForm.value = false
    refreshKey.value++
}

</script>

<template>
    <CommonHeaderComponent></CommonHeaderComponent>
    <main class="adjustment">
        <nav class="breadcrumb">
            <router-link to="/dashboard">ホーム</router-link>
            <span class="separator">›</span>
            <span class="current">書籍管理</span>
        </nav>
        <div class="book-view">
            <h1>書籍管理</h1>
            <button class="add-button" @click="openForm">書籍を追加</button>

            <div v-if="showForm" class="modal-overlay">
                <div class="modal">
                    <button class="close" @click="closeForm">✖</button>
                    <BookFormComponent @book-added="onBookAdded" />
                </div>
            </div>
            <BookListComponent :key="refreshKey" />
        </div>
    </main>
</template>