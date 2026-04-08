import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('recharts')) return 'vendor-recharts'
          if (id.includes('@supabase')) return 'vendor-supabase'
          if (id.includes('react') || id.includes('scheduler')) return 'vendor-react'
          return 'vendor'
        },
      },
    },
  },
})
