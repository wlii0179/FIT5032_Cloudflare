const { defineConfig } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueDevTools = require('vite-plugin-vue-devtools')
const path = require('path')

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})

