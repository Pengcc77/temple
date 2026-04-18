<template>
  <main class="reminder-page" aria-label="參拜前小提醒頁面">
    <section class="reminder-card">
      <header class="reminder-header">
        <p class="step-text">祈福旅程・步驟 2</p>
        <h1>參拜前的小提醒</h1>
      </header>

      <section class="tips-list" aria-label="參拜提醒">
        <article class="tip-item">
          <p>參拜時請保持心靜，放慢步伐。</p>
        </article>
        <article class="tip-item">
          <p>請依廟方動線參拜，保持現場安寧。</p>
        </article>
        <article class="tip-item">
          <p>若對供品或儀式有疑問，可詢問廟方人員。</p>
        </article>
      </section>

      <footer class="reminder-footer">
        <button type="button" class="start-btn" @click="startBlessing">
          開始今日祈福
        </button>
      </footer>
    </section>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startBlessing = () => {
  router.push('/journey/purify')
}
</script>

<style scoped>
.reminder-page {
  min-height: 100dvh;
  padding: 20px 16px;
  display: flex;
  justify-content: center;
  background:
    radial-gradient(circle at 22% 12%, rgba(255, 242, 223, 0.85), transparent 44%),
    radial-gradient(circle at 80% 85%, rgba(247, 226, 202, 0.7), transparent 38%),
    linear-gradient(160deg, #f8f2e8 0%, #efe4d4 100%);
}

.reminder-card {
  width: min(100%, 390px);
  min-height: calc(100dvh - 40px);
  border-radius: 20px;
  padding: 22px 18px 18px;
  background: rgba(255, 251, 245, 0.84);
  border: 1px solid rgba(173, 128, 90, 0.2);
  box-shadow:
    0 14px 30px rgba(112, 82, 58, 0.11),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
  display: flex;
  flex-direction: column;
}

.reminder-header {
  text-align: center;
}

.step-text {
  margin: 0;
  font-size: 13px;
  color: #8d6d53;
  letter-spacing: 0.06em;
}

.reminder-header h1 {
  margin: 10px 0 0;
  font-size: 28px;
  line-height: 1.3;
  color: #4f3b2a;
}

.tips-list {
  margin-top: 20px;
  display: grid;
  gap: 12px;
}

.tip-item {
  border-radius: 14px;
  border: 1px solid rgba(158, 120, 88, 0.26);
  background: rgba(255, 248, 238, 0.88);
  padding: 14px 14px;
  color: #5e4734;
  line-height: 1.7;
}

.tip-item p {
  margin: 0;
  font-size: 15px;
}

.reminder-footer {
  margin-top: auto;
  padding-top: 16px;
  position: sticky;
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 251, 245, 0.96), rgba(255, 251, 245, 0.66), transparent);
}

.start-btn {
  width: 100%;
  min-height: 48px;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  color: #fffaf3;
  background: linear-gradient(180deg, #c89566 0%, #b9804f 100%);
  box-shadow: 0 8px 16px rgba(143, 101, 66, 0.24);
  transition: transform 0.14s ease, opacity 0.2s ease;
}

.start-btn:active {
  transform: translateY(1px);
}

@media (max-width: 360px) {
  .reminder-header h1 {
    font-size: 24px;
  }
}
</style>
