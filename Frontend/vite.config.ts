import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // 設定基礎路徑為相對路徑，適用於 Walrus 部署
  base: './',
  server: {
    host: "::",
    port: 8080,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'dapp-kit': ['@mysten/dapp-kit'],
          'crypto': ['@noble/curves', '@noble/hashes'],
        },
        // 確保資源能在跨域環境下正確載入
        format: 'es',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // 優化建構以支援 Walrus 環境
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
  },
  define: {
    // 確保環境變數在建構時正確替換
    __VITE_SUI_NETWORK__: JSON.stringify(process.env.VITE_SUI_NETWORK || 'testnet'),
    // 添加全局變數定義
    global: 'globalThis',
  },
  optimizeDeps: {
    include: [
      '@mysten/dapp-kit',
      '@mysten/sui',
      '@noble/curves',
      '@noble/hashes'
    ],
    exclude: ['lovable-tagger']
  },
  // 針對 Walrus 環境的特殊配置
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      // 確保在 Walrus 環境下使用相對路徑
      if (hostType === 'js') {
        return `./${filename}`;
      }
      return filename;
    }
  }
}));
