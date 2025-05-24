// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [react(),  tailwindcss(),],
// })


import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
};
