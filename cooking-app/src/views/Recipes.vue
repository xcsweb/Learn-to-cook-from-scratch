<script setup>
import { computed, ref } from 'vue'
import { useRecipeStore } from '../stores/recipe'

const recipeStore = useRecipeStore()
const selectedDifficulty = ref('')
const selectedTag = ref('')

const difficulties = [
  { value: '', label: '全部难度' },
  { value: 'easy', label: '简单' },
  { value: 'medium', label: '中等' },
  { value: 'hard', label: '困难' }
]

const filteredRecipes = computed(() => {
  let recipes = recipeStore.recipes
  
  if (selectedDifficulty.value) {
    recipes = recipes.filter(r => r.difficulty === selectedDifficulty.value)
  }
  
  if (selectedTag.value) {
    recipes = recipes.filter(r => r.tags?.includes(selectedTag.value))
  }
  
  return recipes
})

const getDifficultyLabel = (difficulty) => {
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[difficulty] || difficulty
}

const getDifficultyClass = (difficulty) => {
  const map = { easy: 'easy', medium: 'medium', hard: 'hard' }
  return map[difficulty] || ''
}

const getEmoji = (id) => {
  const emojiMap = {
    'tomato-eggs': '🍅', 'scallion-eggs': '🥚', 'garlic-vegetables': '🥬',
    'cola-chicken-wings': '🍗', 'braised-pork': '🍖'
  }
  return emojiMap[id] || '🍳'
}
</script>

<template>
  <div class="recipes-page">
    <div class="page-header">
      <h1>菜谱中心</h1>
      <p>跟着步骤，一步步做出美味佳肴</p>
    </div>
    
    <!-- 筛选器 -->
    <div class="filters">
      <select v-model="selectedDifficulty" class="filter-select">
        <option v-for="d in difficulties" :key="d.value" :value="d.value">
          {{ d.label }}
        </option>
      </select>
      
      <select v-model="selectedTag" class="filter-select">
        <option value="">全部标签</option>
        <option v-for="tag in recipeStore.allTags" :key="tag" :value="tag">
          {{ tag }}
        </option>
      </select>
    </div>
    
    <!-- 菜谱列表 -->
    <div class="recipes-grid">
      <router-link 
        v-for="recipe in filteredRecipes" 
        :key="recipe.id"
        :to="`/recipes/${recipe.id}`"
        class="recipe-card"
      >
        <div class="recipe-image">
          <span class="recipe-emoji">{{ getEmoji(recipe.id) }}</span>
        </div>
        <div class="recipe-info">
          <h3 class="recipe-name">{{ recipe.name }}</h3>
          <p class="recipe-desc">{{ recipe.description }}</p>
          <div class="recipe-meta">
            <span class="meta-item">⏱️ {{ recipe.cookTime }}分钟</span>
            <span class="meta-item">👥 {{ recipe.servings }}人份</span>
            <span :class="['difficulty', getDifficultyClass(recipe.difficulty)]">
              {{ getDifficultyLabel(recipe.difficulty) }}
            </span>
          </div>
          <div class="recipe-tags">
            <span v-for="tag in recipe.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </router-link>
    </div>
    
    <div v-if="filteredRecipes.length === 0" class="empty-state">
      <p>没有找到符合条件的菜谱</p>
    </div>
  </div>
</template>

<style scoped>
.recipes-page {
  padding-bottom: 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 10px;
}

.page-header p {
  color: #718096;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.filter-select {
  padding: 10px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  background: white;
  cursor: pointer;
  min-width: 120px;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
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
  height: 140px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.recipe-emoji {
  font-size: 3.5rem;
}

.recipe-info {
  padding: 20px;
}

.recipe-name {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 8px;
}

.recipe-desc {
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 12px;
  line-height: 1.5;
}

.recipe-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 12px;
}

.meta-item {
  font-size: 0.85rem;
  color: #4a5568;
}

.difficulty {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
}

.difficulty.easy {
  background: #c6f6d5;
  color: #276749;
}

.difficulty.medium {
  background: #feebc8;
  color: #c05621;
}

.difficulty.hard {
  background: #fed7d7;
  color: #c53030;
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

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #718096;
}

@media (max-width: 768px) {
  .recipes-grid {
    grid-template-columns: 1fr;
  }
  
  .filters {
    flex-direction: column;
  }
  
  .filter-select {
    width: 100%;
  }
}
</style>
