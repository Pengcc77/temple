import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function resolveBasePath() {
  if (process.env.GITHUB_PAGES !== 'true') {
    return '/'
  }

  if (process.env.VITE_BASE_PATH) {
    return process.env.VITE_BASE_PATH
  }

  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
  return repo ? `/${repo}/` : '/'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // For GitHub Pages, defaults to /<repo-name>/ and can be overridden by VITE_BASE_PATH.
  base: resolveBasePath(),
})
