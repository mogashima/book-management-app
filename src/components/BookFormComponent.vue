<template>
    <form @submit.prevent="submitBook" class="book-form">
        <div v-if="successMessage" class="success">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
        <input v-model="book.title" placeholder="タイトル" required />
        <input v-model="book.author" placeholder="著者名" required />
        <input v-model="book.publisher" placeholder="出版社" />
        <input v-model="book.isbn" placeholder="ISBN" />
        <input v-model.number="book.price" type="number" placeholder="定価" />
        <textarea v-model="book.description" placeholder="概要"></textarea>
        <input v-model="book.memo" placeholder="備考" />
        <input v-model="book.purchasedAt" type="date" placeholder="購入日" />

        <button class="submit-button" type="submit">登録</button>
        <div v-if="successMessage" class="success">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </form>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits } from 'vue'
import axios from 'axios'

const emit = defineEmits<{
    (e: 'book-added'): void
}>()

const book = reactive({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    price: 0,
    description: '',
    memo: '',
    purchasedAt: ''
})

const successMessage = ref('')
const errorMessage = ref('')

async function submitBook() {
    try {
        await axios.post('http://localhost:3000/api/books', book)
        successMessage.value = '登録に成功しました！'
        errorMessage.value = ''
        Object.assign(book, {
            title: '',
            author: '',
            publisher: '',
            isbn: '',
            price: 0,
            description: '',
            memo: '',
            purchasedAt: ''
        })
        emit('book-added')
    } catch (err) {
        console.error(err)
        successMessage.value = ''
        errorMessage.value = '登録に失敗しました。'
    }
}
</script>


<style scoped>
.book-form {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
    margin-bottom: 2em;
    max-width: 400px;
    padding: 1.5em;
    border: 1px solid #ccc;
    border-radius: 3px;
    background-color: #ffffff;
}
</style>