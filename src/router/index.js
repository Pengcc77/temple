import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import WishSelectPage from '../pages/WishSelectPage.vue'
import ReminderPage from '../pages/ReminderPage.vue'
import NodePurifyPage from '../pages/NodePurifyPage.vue'
import NodeStoryPage from '../pages/NodeStoryPage.vue'
import ResultPage from '../pages/ResultPage.vue'
import AboutPage from '../pages/AboutPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/wish', name: 'wish', component: WishSelectPage },
  { path: '/reminder', name: 'reminder', component: ReminderPage },
  { path: '/journey/purify', name: 'journey-purify', component: NodePurifyPage },
  { path: '/journey/story', name: 'journey-story', component: NodeStoryPage },
  { path: '/result', name: 'result', component: ResultPage },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
