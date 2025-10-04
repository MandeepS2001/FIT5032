<template>
    <div>
        <h1 style="color: #333; margin-bottom: 20px;">Add Book (via Cloud Function)</h1>
        <form @submit.prevent="addBook" style="max-width: 400px; margin: 0 auto;">
            <div style="margin-bottom: 15px;">
                <label for="isbn" style="display: block; margin-bottom: 5px; font-weight: bold;">ISBN:</label>
                <input 
                    type="number" 
                    v-model="isbn" 
                    id="isbn" 
                    required
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"
                >
            </div>
            <div style="margin-bottom: 15px;">
                <label for="name" style="display: block; margin-bottom: 5px; font-weight: bold;">Name:</label>
                <input 
                    type="text" 
                    v-model="name" 
                    id="name" 
                    required
                    style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"
                >
            </div>
            <button 
                type="submit" 
                :disabled="loading"
                style="
                    background-color: #007bff; 
                    color: white; 
                    padding: 10px 20px; 
                    border: none; 
                    border-radius: 4px; 
                    cursor: pointer; 
                    font-size: 14px;
                    width: 100%;
                "
                :style="{ 
                    backgroundColor: loading ? '#6c757d' : '#007bff',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }"
            >
                {{ loading ? 'Adding...' : 'Add Book via Cloud Function' }}
            </button>
        </form>
        
        <!-- Success/Error Messages -->
        <div v-if="message" style="
            margin-top: 15px; 
            padding: 10px; 
            background: #d4edda; 
            border: 1px solid #c3e6cb; 
            border-radius: 4px; 
            color: #155724;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        ">
            {{ message }}
        </div>
    </div>
    <div style="margin-top: 100px">
        <BookList />
    </div>
</template>
<script setup>
import { ref } from 'vue'
import BookList from '@/components/BookList.vue'

const isbn = ref('')
const name = ref('')
const loading = ref(false)
const message = ref('')
const messageType = ref('')

const addBook = async () => {
    loading.value = true
    message.value = ''
    
    try {
        const response = await fetch('https://us-central1-fit5032-week6-5d1b1.cloudfunctions.net/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isbn: Number(isbn.value),
                name: name.value
            })
        })

        const result = await response.json()
        
        if (response.ok) {
            message.value = result.message
            messageType.value = 'success'
            isbn.value = ''
            name.value = ''
            console.log('Book added successfully via Cloud Function:', result)
        } else {
            message.value = result.message || 'Error adding book'
            messageType.value = 'error'
            console.error('Error adding book:', result)
        }
    } catch (error) {
        message.value = 'Network error: ' + error.message
        messageType.value = 'error'
        console.error('Error adding book:', error)
    } finally {
        loading.value = false
    }
}
</script>