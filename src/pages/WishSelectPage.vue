<script setup>
import { useRouter } from 'vue-router'
import MobileShell from '../components/ui/MobileShell.vue'
import SoftButton from '../components/ui/SoftButton.vue'
import { useBlessingStore } from '../stores/blessingStore'

const router = useRouter()
const { setWishDirection } = useBlessingStore()

const wishDirections = ['祈求心安', '祈求家和', '祈求新生平安']

function chooseDirection(direction) {
  setWishDirection(direction)
  router.push('/reminder')
}
</script>

<template>
  <MobileShell title="選擇祈願方向" subtitle="請先選擇你此刻最想守護的一份心願。">
    <div class="wish-list">
      <button
        v-for="item in wishDirections"
        :key="item"
        class="wish-item"
        type="button"
        @click="chooseDirection(item)"
      >
        {{ item }}
      </button>
    </div>

    <template #footer>
      <SoftButton to="/" kind="ghost">返回首頁</SoftButton>
    </template>
  </MobileShell>
</template>
