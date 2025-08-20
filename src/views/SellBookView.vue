<template>
  <div>
    <h2>Sell a Book</h2>
    <button @click="sellBook">Buy Now</button>
    <div v-if="soldBook">
      <h3>You bought this book:</h3>
      <pre>{{ soldBook }}</pre>
    </div>
    <div v-if="error" style="color:red">{{ error }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      soldBook: null,
      error: ''
    }
  },
  methods: {
    async sellBook() {
      this.error = ''
      try {
        const response = await fetch('https://YOUR_CLOUD_FUNCTION_URL/sellBook', { method: 'GET' });
        const data = await response.json();
        if (data.sold) {
          this.soldBook = JSON.stringify(data.sold, null, 2);
        } else {
          this.soldBook = null;
          this.error = data.message || 'Cloud function error';
        }
      } catch (e) {
        this.error = 'Request failed: ' + e.message;
      }
    }
  }
}
</script>
