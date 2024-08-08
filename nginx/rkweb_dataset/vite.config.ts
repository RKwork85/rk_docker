import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      root: path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
      //根目录
  
  server: {
    host: '0.0.0.0',
    port: 8080, //这里的端口跟配置开发环境文件# .env.development的端口要一致
    proxy: {
      '/v1': {
          target: ' http://dsflask:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
      }
  }
  }



  
  
})


