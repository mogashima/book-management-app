<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import axios from '@/plugins/axios'
import type { Book } from '@/types/BookType'

const props = defineProps<{ book: Book }>()
const emit = defineEmits(['close', 'book-updated'])

const editedBook = ref({ ...props.book })

const submitEdit = async () => {
  try {
    const { _id, ...updateData } = editedBook.value
    await axios.put(`http://localhost:3000/api/books/${editedBook.value._id}`, updateData)
    emit('book-updated')
    emit('close')
  } catch (err) {
    alert('更新に失敗しました')
  }
}
</script>

<template>
  <form @submit.prevent="submitEdit" class="book-form">
    <input v-model="editedBook.title" placeholder="タイトル" required />
    <input v-model="editedBook.author" placeholder="著者名" required />
    <input v-model="editedBook.publisher" placeholder="出版社" />
    <input v-model="editedBook.isbn" placeholder="ISBN" />
    <input v-model.number="editedBook.price" type="number" placeholder="定価" />
    <textarea v-model="editedBook.description" placeholder="概要"></textarea>
    <input v-model="editedBook.memo" placeholder="備考" />
    <input v-model="editedBook.purchasedAt" type="date" placeholder="購入日" />
    <button class="update-button" type="submit">更新</button>
  </form>
</template>

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