<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'
import type { Book } from '@/types/BookType'

const borrowedBooks = ref<Book[]>([])

const fetchBorrowedBooks = async () => {
    const res = await axios.get('/api/books/borrowed')
    borrowedBooks.value = res.data
}

const returnBook = async (bookId?: string) => {
    try {
        await axios.put(`/api/books/${bookId}/return`)
        // 返却後リストから除外
        borrowedBooks.value = borrowedBooks.value.filter(book => book._id !== bookId)
    } catch (err) {
        alert('返却に失敗しました')
    }
}

onMounted(fetchBorrowedBooks)
</script>


<template>
    <section class="borrowed-books">
        <h2>借りている本</h2>
        <div v-if="borrowedBooks.length === 0" class="no-books">
            <p>借りている書籍はありません。</p>
        </div>
        <div v-else class="book-grid">
            <div v-for="book in borrowedBooks" :key="book._id" class="book-card">
                <h3>{{ book.title }}</h3>
                <p>著者: {{ book.author }}</p>
                <p>出版社: {{ book.publisher }}</p>
                <p>ISBN: {{ book.isbn }}</p>
                <p>貸出日: {{ new Date(book.borrowedAt).toLocaleDateString() }}</p>
                <button class="return-button" @click="returnBook(book._id)">返却</button>
            </div>
        </div>
    </section>
</template>