import { createRouter, createWebHistory } from "vue-router"
import SkiResortPage from "@/pages/SkiResortPage.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", name: "ski-resort", component: SkiResortPage }],
});
