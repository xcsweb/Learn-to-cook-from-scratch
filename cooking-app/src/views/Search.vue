<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useIngredientStore } from '../stores/ingredient'
import { useRecipeStore } from '../stores/recipe'

const route = useRoute()
const router = useRouter()
const ingredientStore = useIngredientStore()
const recipeStore = useRecipeStore()

const keyword = ref(route.query.q || '')

const searchResults = computed(() => {
  if (!keyword.value.trim()) {
    return { ingredients: [], seasonings: [], recipes: [] }
  }
  
  const ingredientResults = ingredientStore.search(keyword.value)
  const recipeResults = recipeStore.searchRecipes(keyword.value)
  
  return {
    ingredients: ingredientResults.ingredients,
    seasonings: ingredientResults.seasonings,
    recipes: recipeResults.recipes
  }
})

const hasResults = computed(() => {
  return searchResults.value.ingredients.length > 0 ||
         searchResults.value.seasonings.length > 0 ||
         searchResults.value.recipes.length > 0
})

const handleSearch = () => {
  if (keyword.value.trim()) {
    router.push({ path: '/search', query: { q: keyword.value.trim() } })
  }
}

watch(() => route.query.q, (newQuery) => {
  keyword.value = newQuery || ''
})

const getIngredientEmoji = (id) => {
  const emojiMap = {
    'scallion': '🧅', 'ginger': '🫚', 'garlic': '🧄', 'tomato': '🍅', 'egg': '🥚'
  }
  return emojiMap[id] || '🥬'
}

const getSeasoningEmoji = (id) => {
  const emojiMap = {
    'salt': '🧂', 'sugar': '🍬', 'light-soy-sauce': '🫗', 'dark-soy-sauce': '🫗',
    'cooking-wine': '🍶', 'vinegar': '🍾', 'oyster-sauce': '🫗', 'cooking-oil': '🫒'
  }
  return emojiMap[id] || '🧂'
}

const getRecipeEmoji = (id) => {
  const emojiMap = {
    'tomato-eggs': '🍅', 'scallion-eggs': '🥚', 'garlic-vegetables': '🥬',
    'cola-chicken-wings': '🍗', 'braised-pork': '🍖'
  }
  return emojiMap[id] || '🍳'
}
</script>

<template>
  <div class="search-page">
    <div class="search-header">
      <h1>搜索结果</h1>
      <div class="search-box">
        <input 
          v-model="keyword"
          type="text" 
          placeholder="搜索食材、调料、菜谱..." 
          @keyup.enter="handleSearch"
          class="search-input"
        />
        <button @click="handleSearch" class="search-btn">搜索</button>
      </div>
    </div>
    
    <div v-if="keyword && hasResults" class="results">
      <!-- 食材结果 -->
      <section v-if="searchResults.ingredients.length" class="result-section">
        <h2>🥬 食材 ({{ searchResults.ingredients.length }})</h2>
        <div class="result-items">
          <router-link 
            v-for="item in searchResults.ingredients" 
            :key="item.id"
            :to="`/ingredients/${item.id}`"
            class="result-item"
          >
            <span class="item-emoji">{{ getIngredientEmoji(item.id) }}</span>
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-desc">{{ item.description.slice(0, 40) }}...</span>
            </div>
          </router-link>
        </div>
      </section>
      
      <!-- 调料结果 -->
      <section v-if="searchResults.seasonings.length" class="result-section">
        <h2>🧂 调料 ({{ searchResults.seasonings.length }})</h2>
        <div class="result-items">
          <router-link 
            v-for="item in searchResults.seasonings" 
            :key="item.id"
            :to="`/seasonings/${item.id}`"
            class="result-item"
          >
            <span class="item-emoji">{{ getSeasoningEmoji(item.id) }}</span>
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-desc">{{ item.description.slice(0, 40) }}...</span>
            </div>
          </router-link>
        </div>
      </section>
      
      <!-- 菜谱结果 -->
      <section v-if="searchResults.recipes.length" class="result-section">
        <h2>🍳 菜谱 ({{ searchResults.recipes.length }})</h2>
        <div class="result-items">
          <router-link 
            v-for="item in searchResults.recipes" 
            :key="item.id"
            :to="`/recipes/${item.id}`"
            class="result-item"
          >
            <span class="item-emoji">{{ getRecipeEmoji(item.id) }}</span>
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-desc">{{ item.description.slice(0, 40) }}...</span>
            </div>
          </router-link>
        </div>
      </section>
    </div>
    
    <div v-else-if="keyword && !hasResults" class="no-results">
      <p>未找到与"{{ keyword }}"相关的内容</p>
      <p class="suggestion">试试搜索：葱、姜、蒜、番茄炒蛋</p>
    </div>
    
    <div v-else class="empty-state">
      <p>请输入关键词进行搜索</p>
      <p class="suggestion">试试搜索：葱、姜、蒜、番茄炒蛋</p>
    </div>
  </div>
</template>

<style scoped>
.search-page {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.search-header {
  text-align: center;
  margin-bottom: 30px;
}

.search-header h1 {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
}

.search-input:focus {
  border-color: #667eea;
}

.search-btn {
  padding: 12px 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
}

.search-btn:hover {
  opacity: 0.9;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.result-section {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.result-section h2 {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.result-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.3s;
}

.result-item:hover {
  background: #edf2f7;
}

.item-emoji {
  font-size: 1.8rem;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-name {
  font-weight: 600;
  color: #2d3748;
}

.item-desc {
  font-size: 0.85rem;
  color: #718096;
}

.no-results,
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.no-results p,
.empty-state p {
  color: #718096;
  margin-bottom: 10px;
}

.suggestion {
  font-size: 0.9rem;
  color: #a0aec0;
}

@media (max-width: 768px) {
  .search-box {
    flex-direction: column;
  }
  
  .search-input,
  .search-btn {
    width: 100%;
  }
}
</style>
