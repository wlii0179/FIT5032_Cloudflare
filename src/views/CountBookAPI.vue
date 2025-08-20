<template>
    <div>
        <h2>Count Books</h2>
        <button @click="countBooks">Count books in authors.json</button>
        <div v-if="result !== null">Book count: {{ result }}</div>
        <div v-if="error" style="color:red">{{ error }}</div>
    </div>
</template>

<script>
import authors from '../assets/json/authors.json'
export default {
    data() {
        return {
            result: null,
            error: ''
        }
    },
    methods: {
        async countBooks() {
            this.error = ''
            try {
                const response = await fetch('https://YOUR_CLOUD_FUNCTION_URL/countBooks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ books: authors })
                });
                const data = await response.json();
                if (data.count !== undefined) {
                    this.result = data.count;
                } else {
                    this.error = data.error || 'Cloud function error';
                }
            } catch (e) {
                this.error = 'Request failed: ' + e.message;
            }
        }
    }
}
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