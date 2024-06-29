import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    // 端口号
    port: 3000,
    // 是否自动打开浏览器
    open: true,
    proxy: {
      // 配置代理
      '/api': {
        target: 'http://www.baidu.com', // 目标服务器地址
        changeOrigin: true // 是否允许跨域
        // rewrite: path => path.replace(/^\/api/, '') // 请求地址的修改
      }
    }
  },
  // 打包
  build: {
    assetsInlineLimit: 20000 // 小于 20 kb
  },
  resolve: {
    alias: {
      '@': '/src' // 设置别名
    },
    extensions: ['.js', '.json', '.ts', '.vue'] // 自动解析确定的扩展
  }
});
