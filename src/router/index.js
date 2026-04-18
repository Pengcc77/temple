import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import WishSelectPage from '../pages/WishSelectPage.vue'
import ReminderPage from '../pages/ReminderPage.vue'
import JourneyPage from '../pages/JourneyPage.vue'
import NodePurifyPage from '../pages/NodePurifyPage.vue'
import NodeOfferPage from '../pages/NodeOfferPage.vue'
import NodeStoryPage from '../pages/NodeStoryPage.vue'
import NodeBlessingPage from '../pages/NodeBlessingPage.vue'
import ResultPage from '../pages/ResultPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/wish', name: 'wish', component: WishSelectPage },
  { path: '/reminder', name: 'reminder', component: ReminderPage },
  { path: '/journey', name: 'journey', component: JourneyPage },
  { path: '/node/purify', name: 'node-purify', component: NodePurifyPage },
  { path: '/node/offer', name: 'node-offer', component: NodeOfferPage },
  { path: '/node/story', name: 'node-story', component: NodeStoryPage },
  { path: '/node/blessing', name: 'node-blessing', component: NodeBlessingPage },
  { path: '/result', name: 'result', component: ResultPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
