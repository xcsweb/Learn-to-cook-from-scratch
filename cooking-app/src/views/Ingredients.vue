<script setup>
import { computed } from 'vue'
import { useIngredientStore } from '../stores/ingredient'

const ingredientStore = useIngredientStore()

const categories = [
  { key: 'vegetable', name: '蔬菜类', icon: '🥬' },
  { key: 'protein', name: '蛋白质', icon: '🥚' },
  { key: 'basic', name: '基础调料', icon: '🧂' },
  { key: 'sauce', name: '酱料类', icon: '🍶' },
  { key: 'oil', name: '油类', icon: '🫒' }
]

const getIngredientsByCategory = (category) => {
  return ingredientStore.ingredients.filter(i => i.category === category)
}

const getSeasoningsByCategory = (category) => {
  return ingredientStore.seasonings.filter(s => s.category === category)
}

const getEmoji = (id, type) => {
  const emojiMap = {
    'scallion': '🧅', 'ginger': '🫚', 'garlic': '🧄', 'tomato': '🍅', 'egg': '🥚',
    'salt': '🧂', 'sugar': '🍬', 'light-soy-sauce': '🫗', 'dark-soy-sauce': '🫗',
    'cooking-wine': '🍶', 'vinegar': '🍾', 'oyster-sauce': '🫗', 'cooking-oil': '🫒'
  }
  return emojiMap[id] || '🥘'
}
</script>

<template>
  <div class="ingredients-page">
    <div class="page-header">
      <h1>食材调料库</h1>
      <p>了解常用食材和调料的作用、用量及搭配技巧</p>
    </div>
    
    <!-- 食材部分 -->
    <section class="section">
      <h2 class="section-title">🥬 食材</h2>
      
      <div v-for="cat in categories.filter(c => ['vegetable', 'protein'].includes(c.key))" :key="cat.key" class="category-section">
        <h3 class="category-title">{{ cat.icon }} {{ cat.name }}</h3>
        <div class="items-grid">
          <router-link 
            v-for="item in getIngredientsByCategory(cat.key)" 
            :key="item.id"
            :to="`/ingredients/${item.id}`"
            class="item-card"
          >
            <span class="item-emoji">{{ getEmoji(item.id, 'ingredient') }}</span>
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-desc">{{ item.description.slice(0, 30) }}...</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- 调料部分 -->
    <section class="section">
      <h2 class="section-title">🧂 调料</h2>
      
      <div v-for="cat in categories.filter(c => ['basic', 'sauce', 'oil'].includes(c.key))" :key="cat.key" class="category-section">
        <h3 class="category-title">{{ cat.icon }} {{ cat.name }}</h3>
        <div class="items-grid">
          <router-link 
            v-for="item in getSeasoningsByCategory(cat.key)" 
            :key="item.id"
            :to="`/seasonings/${item.id}`"
            class="item-card"
          >
            <span class="item-emoji">{{ getEmoji(item.id, 'seasoning') }}</span>
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-desc">{{ item.description.slice(0, 30) }}...</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ingredients-page {
  padding-bottom: 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 10px;
}

.page-header p {
  color: #718096;
}

.section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e2e8f0;
}

.category-section {
  margin-bottom: 30px;
}

.category-title {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 15px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}

.item-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
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
  flex-shrink: 0;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-name {
  font-size: 1rem;
  color: #2d3748;
  font-weight: 500;
}

.item-desc {
  font-size: 0.85rem;
  color: #718096;
}

@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: 1fr;
  }
}
</style>
