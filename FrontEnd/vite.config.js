import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  content: ["./src//*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        zenTeal: '#38b2ac',
        ironGold: '#fbbf24',
      },
    },
  },
  plugins:[react(),
    tailwindcss(),
  
  ],
})
