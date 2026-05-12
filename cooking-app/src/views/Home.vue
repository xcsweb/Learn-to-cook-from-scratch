<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useIngredientStore } from '../stores/ingredient'
import { useRecipeStore } from '../stores/recipe'

const router = useRouter()
const ingredientStore = useIngredientStore()
const recipeStore = useRecipeStore()

const quickLinks = [
  { icon: '📚', title: '入门指南', desc: '从零开始学做饭', path: '/guide' },
  { icon: '🥬', title: '食材调料', desc: '了解常用食材', path: '/ingredients' },
  { icon: '📖', title: '菜谱中心', desc: '跟着步骤做', path: '/recipes' }
]

const featuredRecipes = computed(() => recipeStore.recipes.slice(0, 3))
const featuredIngredients = computed(() => ingredientStore.ingredients.slice(0, 4))
const featuredSeasonings = computed(() => ingredientStore.seasonings.slice(0, 4))
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="hero-title">从零开始，学会做饭</h1>
      <p class="hero-subtitle">科学依据型厨艺教学，让每个人都能做出美味佳肴</p>
      <router-link to="/guide" class="hero-btn">开始学习</router-link>
    </section>
    
    <!-- Quick Links -->
    <section class="quick-links">
      <div class="section-title">快速入口</div>
      <div class="links-grid">
        <router-link 
          v-for="link in quickLinks" 
          :key="link.path" 
          :to="link.path"
          class="link-card"
        >
          <span class="link-icon">{{ link.icon }}</span>
          <span class="link-title">{{ link.title }}</span>
          <span class="link-desc">{{ link.desc }}</span>
        </router-link>
      </div>
    </section>
    
    <!-- Featured Recipes -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">推荐菜谱</h2>
        <router-link to="/recipes" class="view-all">查看全部 →</router-link>
      </div>
      <div class="recipes-grid">
        <router-link 
          v-for="recipe in featuredRecipes" 
          :key="recipe.id"
          :to="`/recipes/${recipe.id}`"
          class="recipe-card"
        >
          <div class="recipe-image">
            <span class="recipe-emoji">{{ recipe.id === 'tomato-eggs' ? '🍅' : recipe.id === 'scallion-eggs' ? '🥚' : recipe.id === 'garlic-vegetables' ? '🥬' : recipe.id === 'cola-chicken-wings' ? '🍗' : '🍖' }}</span>
          </div>
          <div class="recipe-info">
            <h3 class="recipe-name">{{ recipe.name }}</h3>
            <div class="recipe-meta">
              <span>{{ recipe.cookTime }}分钟</span>
              <span>{{ recipe.difficulty === 'easy' ? '简单' : '中等' }}</span>
            </div>
            <div class="recipe-tags">
              <span v-for="tag in recipe.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
    
    <!-- Featured Ingredients -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">常用食材</h2>
        <router-link to="/ingredients" class="view-all">查看全部 →</router-link>
      </div>
      <div class="items-grid">
        <router-link 
          v-for="item in featuredIngredients" 
          :key="item.id"
          :to="`/ingredients/${item.id}`"
          class="item-card"
        >
          <span class="item-emoji">{{ item.id === 'scallion' ? '🧅' : item.id === 'ginger' ? '🫚' : item.id === 'garlic' ? '🧄' : item.id === 'tomato' ? '🍅' : '🥚' }}</span>
          <span class="item-name">{{ item.name }}</span>
        </router-link>
      </div>
    </section>
    
    <!-- Featured Seasonings -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">常用调料</h2>
        <router-link to="/ingredients" class="view-all">查看全部 →</router-link>
      </div>
      <div class="items-grid">
        <router-link 
          v-for="item in featuredSeasonings" 
          :key="item.id"
          :to="`/seasonings/${item.id}`"
          class="item-card"
        >
          <span class="item-emoji">{{ item.id === 'salt' ? '🧂' : item.id === 'sugar' ? '🍬' : item.id === 'light-soy-sauce' ? '🫗' : item.id === 'dark-soy-sauce' ? '🫗' : '🍶' }}</span>
          <span class="item-name">{{ item.name }}</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  padding-bottom: 40px;
}

/* Hero */
.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  border-radius: 20px;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 2.5rem;
  color: #2d3748;
  margin-bottom: 15px;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 30px;
}

.hero-btn {
  display: inline-block;
  padding: 12px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

/* Quick Links */
.quick-links {
  margin-bottom: 40px;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background: white;
  border-radius: 15px;
  text-decoration: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.link-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.link-title {
  font-size: 1.1rem;
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 5px;
}

.link-desc {
  font-size: 0.9rem;
  color: #718096;
}

/* Sections */
.section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 1.5rem;
  color: #2d3748;
  font-weight: 600;
}

.view-all {
  color: #667eea;
  text-decoration: none;
  font-size: 0.95rem;
}

.view-all:hover {
  text-decoration: underline;
}

/* Recipes Grid */
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.recipe-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.recipe-image {
  height: 120px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.recipe-emoji {
  font-size: 3rem;
}

.recipe-info {
  padding: 15px;
}

.recipe-name {
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 8px;
}

.recipe-meta {
  display: flex;
  gap: 15px;
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 10px;
}

.recipe-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 3px 10px;
  background: #f0f4ff;
  color: #667eea;
  border-radius: 12px;
  font-size: 0.75rem;
}

/* Items Grid */
.items-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.item-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.item-emoji {
  font-size: 2rem;
  margin-bottom: 8px;
}

.item-name {
  font-size: 0.95rem;
  color: #2d3748;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .recipes-grid {
    grid-template-columns: 1fr;
  }
  
  .items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
