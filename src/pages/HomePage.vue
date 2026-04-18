<template>
  <main class="home-page" aria-label="註生娘娘數位祈福體驗首頁">
    <section class="hero-card">
      <header class="hero-header">
        <p class="temple-name">鹿港天后宮・註生娘娘殿</p>
        <h1 class="headline">以一段小小祈願，向註生娘娘獻上祝福</h1>
        <p class="subtext">在等待的片刻，也能留下溫柔祈福</p>
      </header>

      <nav class="actions" aria-label="首頁操作">
        <button type="button" class="btn btn-primary" @click="startBlessing">
          開始祈福
        </button>
        <button type="button" class="btn btn-secondary" @click="goToAbout">
          廟宇簡介
        </button>
      </nav>
    </section>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startBlessing = () => {
  router.push('/wish')
}

const goToAbout = () => {
  // TODO: router.push('/about')
  console.log('go to about')
}
</script>

<style scoped>
.home-page {
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;
  background:
    radial-gradient(circle at 20% 15%, rgba(255, 241, 222, 0.8), transparent 45%),
    radial-gradient(circle at 85% 80%, rgba(250, 228, 204, 0.7), transparent 40%),
    linear-gradient(160deg, #f8f2e8 0%, #efe4d4 100%);
}

.hero-card {
  width: min(100%, 390px);
  border-radius: 20px;
  padding: 24px 20px;
  background: rgba(255, 251, 245, 0.82);
  border: 1px solid rgba(173, 128, 90, 0.2);
  box-shadow:
    0 14px 30px rgba(112, 82, 58, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(3px);
}

.hero-header {
  text-align: center;
}

.temple-name {
  margin: 0 0 10px;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: #8d6d53;
}

.headline {
  margin: 0;
  font-size: 28px;
  line-height: 1.35;
  color: #4f3b2a;
  font-weight: 700;
}

.subtext {
  margin: 14px 0 0;
  font-size: 15px;
  line-height: 1.7;
  color: #6e5643;
}

.actions {
  margin-top: 26px;
  display: grid;
  gap: 12px;
}

.btn {
  width: 100%;
  min-height: 48px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform 0.14s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.btn:active {
  transform: translateY(1px);
}

.btn-primary {
  color: #fffaf3;
  background: linear-gradient(180deg, #c89566 0%, #b9804f 100%);
  box-shadow: 0 8px 16px rgba(143, 101, 66, 0.24);
}

.btn-primary:hover {
  background: linear-gradient(180deg, #cf9e71 0%, #be8858 100%);
}

.btn-secondary {
  color: #6a4f3a;
  background: rgba(255, 248, 238, 0.9);
  border-color: rgba(158, 120, 88, 0.35);
}

.btn-secondary:hover {
  background: rgba(255, 244, 229, 0.95);
}

@media (max-width: 360px) {
  .headline {
    font-size: 24px;
  }
}
</style>
