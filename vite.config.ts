import path from 'path'
import vitePluginString from 'vite-plugin-string'
import { UserConfig } from 'vite'
import babel from 'vite-babel-plugin'
const vueJsxPlugin = require('@vitejs/plugin-vue-jsx')
const vuePlugin = require('@vitejs/plugin-vue')

export default {
  plugins: [vuePlugin(), vueJsxPlugin(), vitePluginString(), babel()],
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@img': path.resolve(__dirname, 'src/assets/img'),
  },
} as UserConfig
