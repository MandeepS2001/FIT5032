<template>
    <div>
        <h1>Count Book API</h1>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else>
            <pre>{{ jsondata }}</pre>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const error = ref(null)
const loading = ref(false)

const getBookCountAPI = async () => {
    loading.value = true
    try {
        const response = await axios.get('https://us-central1-fit5032-week6-5d1b1.cloudfunctions.net/countBooks')
        jsondata.value = response.data
        error.value = null
    } catch (err) {
        console.error('Error fetching book count:', err)
        error.value = err
        jsondata.value = null
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getBookCountAPI()
})
</script>