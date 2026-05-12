import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页 - 厨艺入门' }
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: () => import('../views/Ingredients.vue'),
    meta: { title: '食材调料库 - 厨艺入门' }
  },
  {
    path: '/ingredients/:id',
    name: 'IngredientDetail',
    component: () => import('../views/IngredientDetail.vue'),
    meta: { title: '食材详情 - 厨艺入门' }
  },
  {
    path: '/seasonings/:id',
    name: 'SeasoningDetail',
    component: () => import('../views/SeasoningDetail.vue'),
    meta: { title: '调料详情 - 厨艺入门' }
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () => import('../views/Recipes.vue'),
    meta: { title: '菜谱中心 - 厨艺入门' }
  },
  {
    path: '/recipes/:id',
    name: 'RecipeDetail',
    component: () => import('../views/RecipeDetail.vue'),
    meta: { title: '菜谱详情 - 厨艺入门' }
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('../views/Guide.vue'),
    meta: { title: '入门指南 - 厨艺入门' }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: { title: '搜索结果 - 厨艺入门' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '厨艺入门'
  next()
})

export default router
