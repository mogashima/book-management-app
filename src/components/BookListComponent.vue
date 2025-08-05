<template>
    <div class="book-list">
        <div class="book-grid">
            <div v-for="book in books" :key="book._id" class="book-card">
                <h2>{{ book.title }}</h2>
                <p><strong>著者:</strong> {{ book.author }}</p>
                <p><strong>出版社:</strong> {{ book.publisher }}</p>
                <p><strong>購入日:</strong> {{ formatDate(book.purchasedAt) }}</p>
                <div class="button-group">
                    <button class="edit-button" @click="openEdit(book)">編集</button>
                    <div class="spacer"></div>
                    <button class="borrow-button" @click="borrowBook(book)"
                        v-if="!book.borrowedAt || book.borrowedAt === ''">借りる</button>
                </div>
            </div>
        </div>

        <!-- 編集モーダル -->
        <div v-if="editingBook" class="modal-overlay">
            <div class="modal">
                <button class="close" @click="closeEdit">✖</button>
                <BookEditComponent :book="editingBook" @close="closeEdit" @book-updated="onBookUpdated" />
            </div>
        </div>

        <div v-if="loading">読み込み中...</div>
        <div v-if="error" class="error">読み込みに失敗しました。</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from '@/plugins/axios'
import BookEditComponent from '@/components/BookEditComponent.vue'
import type { Book } from '@/types/BookType'

const props = defineProps({ refreshKey: Number })

const books = ref<Book[]>([])
const loading = ref(false)
const error = ref(false)
const editingBook = ref<Book | null>(null)

const fetchBooks = async () => {
    loading.value = true
    try {
        const res = await axios.get('/api/books')
        books.value = res.data
    } catch {
        error.value = true
    } finally {
        loading.value = false
    }
}

const borrowBook = async (book: Book) => {
    try {
        await axios.post(`/api/books/${book._id}/borrow`)
        alert(`「${book.title}」を借りました。`)
        fetchBooks() // 再取得してUIを更新
    } catch (e) {
        alert('貸出に失敗しました。')
    }
}

const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('ja-JP')
}

const openEdit = (book: Book) => {
    editingBook.value = { ...book }
}

const closeEdit = () => {
    editingBook.value = null
}

const onBookUpdated = () => {
    closeEdit()
    fetchBooks()
}

onMounted(fetchBooks)
watch(() => props.refreshKey, () => fetchBooks())
</script>


<style scoped></style>