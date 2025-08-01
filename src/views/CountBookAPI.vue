<template>
    <div>
        <h1>Get All Books API</h1>
        <div v-if="loading" class="loading">
            Loading books data...
        </div>
        <div v-else-if="error" class="error">
            {{ error }}
        </div>
        <div v-else-if="apiResponse" class="api-response">
            <h2>All Books Data (JSON Format)</h2>
            <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, getDocs } from 'firebase/firestore'

const books = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const getAllBooks = async () => {
    loading.value = true
    error.value = null
    
    try {
        const querySnapshot = await getDocs(collection(db, 'books'))
        const booksArray = []
        
        querySnapshot.forEach((doc) => {
            booksArray.push({
                id: doc.id,
                ...doc.data()
            })
        })
        
        books.value = booksArray
        
        // Create API response in JSON format
        apiResponse.value = {
            success: true,
            data: {
                totalBooks: booksArray.length,
                books: booksArray,
                timestamp: new Date().toISOString()
            }
        }
        
    } catch (err) {
        error.value = `Error loading books data: ${err.message}`
        console.error('Error loading books data:', err)
        
        apiResponse.value = {
            success: false,
            error: err.message,
            timestamp: new Date().toISOString()
        }
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getAllBooks()
})

defineExpose({
    getAllBooks
})
</script>

<style scoped>
.loading {
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #666;
}

.error {
    color: red;
    padding: 20px;
    text-align: center;
}

.api-response {
    margin: 20px;
}

.api-response h2 {
    color: #333;
    margin-bottom: 15px;
}

.api-response pre {
    background: #f5f5f5;
    padding: 15px;
    border-radius: 5px;
    overflow-x: auto;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.4;
    border: 1px solid #ddd;
}
</style>