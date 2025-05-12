import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/official/' : '/',
  build: {
    outDir: 'docs',
    minify: 'terser',  // terserを使用して難読化
    terserOptions: {
      compress: {
        drop_console: true,  // console.logなどを削除
        drop_debugger: true, // debuggerを削除
        pure_funcs: ['console.log'],
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        collapse_vars: true
      },
      mangle: {
        keep_classnames: false,
        keep_fnames: false,
        toplevel: true,
        properties: {
          regex: /^_/ // _で始まるプロパティ名のみ難読化
        }
      },
      format: {
        comments: false,  // コメントを削除
        ascii_only: true,
        beautify: false
      },
      sourceMap: false,
      nameCache: null
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
});
