<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '../stores/recipe'
import { usePreferenceStore } from '../stores/preference'
import { calculateRecipeAmounts } from '../utils/calculator'

const route = useRoute()
const recipeStore = useRecipeStore()
const preferenceStore = usePreferenceStore()

const recipe = computed(() => {
  return recipeStore.getRecipeById(route.params.id)
})

// 用量计算
const calculatedIngredients = computed(() => {
  if (!recipe.value) return []
  return calculateRecipeAmounts(recipe.value)
})

// 偏好设置
const showSettings = ref(false)

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
  <div class="detail-page" v-if="recipe">
    <router-link to="/recipes" class="back-link">← 返回菜谱中心</router-link>
    
    <div class="detail-header">
      <span class="detail-emoji">{{ getEmoji(recipe.id) }}</span>
      <div class="header-info">
        <h1>{{ recipe.name }}</h1>
        <div class="recipe-meta">
          <span>⏱️ {{ recipe.cookTime }}分钟</span>
          <span>👥 {{ recipe.servings }}人份</span>
          <span :class="['difficulty', getDifficultyClass(recipe.difficulty)]">
            {{ getDifficultyLabel(recipe.difficulty) }}
          </span>
        </div>
        <div class="recipe-tags">
          <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
    
    <p class="recipe-description">{{ recipe.description }}</p>
    
    <!-- 用量计算器 -->
    <div class="calculator-section">
      <div class="section-header">
        <h2>🧮 用量计算器</h2>
        <button @click="showSettings = !showSettings" class="settings-btn">
          {{ showSettings ? '收起设置' : '调整偏好' }}
        </button>
      </div>
      
      <div v-if="showSettings" class="settings-panel">
        <div class="setting-group">
          <label>用餐人数</label>
          <div class="number-inputs">
            <div class="number-input">
              <span>大人</span>
              <input type="number" v-model.number="preferenceStore.adultCount" min="1" max="10" />
            </div>
            <div class="number-input">
              <span>小孩</span>
              <input type="number" v-model.number="preferenceStore.childCount" min="0" max="10" />
            </div>
          </div>
        </div>
        
        <div class="setting-group">
          <label>口味偏好</label>
          <div class="radio-group">
            <label v-for="opt in preferenceStore.tasteOptions" :key="opt.value" class="radio-item">
              <input type="radio" v-model="preferenceStore.tastePreference" :value="opt.value" />
              <span class="radio-label">{{ opt.label }}</span>
              <span class="radio-desc">{{ opt.description }}</span>
            </label>
          </div>
        </div>
        
        <div class="setting-group">
          <label>地域偏好</label>
          <div class="radio-group">
            <label v-for="opt in preferenceStore.regionOptions" :key="opt.value" class="radio-item">
              <input type="radio" v-model="preferenceStore.regionPreference" :value="opt.value" />
              <span class="radio-label">{{ opt.label }}</span>
              <span class="radio-desc">{{ opt.description }}</span>
            </label>
          </div>
        </div>
      </div>
      
      <div class="ingredients-list">
        <h3>食材清单（{{ Math.round(preferenceStore.totalServings() * 10) / 10 }}人份）</h3>
        <div class="ingredient-items">
          <div v-for="item in calculatedIngredients" :key="item.id" class="ingredient-item">
            <span class="ingredient-name">{{ item.name }}</span>
            <span class="ingredient-amount">
              {{ item.calculation.adjusted }} {{ item.unit }}
              <span v-if="item.calculation.adjusted !== item.amount" class="original">
                (原方: {{ item.amount }} {{ item.unit }})
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 步骤 -->
    <div class="steps-section">
      <h2>📝 制作步骤</h2>
      <div class="steps-list">
        <div v-for="step in recipe.steps" :key="step.order" class="step-item">
          <div class="step-number">{{ step.order }}</div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
            <div class="step-tips" v-if="step.tips">
              <span class="tips-icon">💡</span>
              <span>{{ step.tips }}</span>
            </div>
            <div class="step-time" v-if="step.time">
              ⏱️ 预计 {{ step.time }} 分钟
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 小贴士 -->
    <div class="tips-section" v-if="recipe.tips?.length">
      <h2>💡 小贴士</h2>
      <ul class="tips-list">
        <li v-for="(tip, index) in recipe.tips" :key="index">{{ tip }}</li>
      </ul>
    </div>
    
    <!-- 常见问题 -->
    <div class="mistakes-section" v-if="recipe.commonMistakes?.length">
      <h2>❓ 常见问题</h2>
      <div class="mistakes-list">
        <div v-for="(mistake, index) in recipe.commonMistakes" :key="index" class="mistake-item">
          <div class="mistake-title">{{ mistake.mistake }}</div>
          <div class="mistake-reason">原因：{{ mistake.reason }}</div>
          <div class="mistake-solution">解决：{{ mistake.solution }}</div>
        </div>
      </div>
    </div>
    
    <!-- 营养信息 -->
    <div class="nutrition-section" v-if="recipe.nutritionInfo">
      <h2>🍎 营养信息</h2>
      <div class="nutrition-info">
        <div v-for="(value, key) in recipe.nutritionInfo" :key="key" class="nutrition-item">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="not-found">
    <p>未找到该菜谱</p>
    <router-link to="/recipes">返回菜谱中心</router-link>
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.back-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  margin-bottom: 20px;
}

.back-link:hover {
  text-decoration: underline;
}

.detail-header {
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  border-radius: 15px;
}

.detail-emoji {
  font-size: 4rem;
  flex-shrink: 0;
}

.header-info h1 {
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 10px;
}

.recipe-meta {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.recipe-meta span {
  color: #4a5568;
}

.difficulty {
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.difficulty.easy {
  background: #c6f6d5;
  color: #276749;
}

.difficulty.medium {
  background: #feebc8;
  color: #c05621;
}

.recipe-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  background: white;
  color: #667eea;
  border-radius: 15px;
  font-size: 0.8rem;
}

.recipe-description {
  color: #4a5568;
  line-height: 1.7;
  margin-bottom: 25px;
  font-size: 1.05rem;
}

/* 计算器 */
.calculator-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 1.3rem;
  color: #2d3748;
}

.settings-btn {
  padding: 8px 16px;
  background: #f0f4ff;
  color: #667eea;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}

.settings-btn:hover {
  background: #e0e8ff;
}

.settings-panel {
  padding: 20px;
  background: #f7fafc;
  border-radius: 10px;
  margin-bottom: 20px;
}

.setting-group {
  margin-bottom: 20px;
}

.setting-group:last-child {
  margin-bottom: 0;
}

.setting-group label {
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 10px;
}

.number-inputs {
  display: flex;
  gap: 20px;
}

.number-input {
  display: flex;
  align-items: center;
  gap: 10px;
}

.number-input input {
  width: 60px;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  text-align: center;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: white;
  border-radius: 8px;
  cursor: pointer;
}

.radio-item input {
  accent-color: #667eea;
}

.radio-label {
  font-weight: 500;
  color: #2d3748;
}

.radio-desc {
  color: #718096;
  font-size: 0.85rem;
}

.ingredients-list h3 {
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 15px;
}

.ingredient-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  background: #f7fafc;
  border-radius: 8px;
}

.ingredient-name {
  font-weight: 500;
  color: #2d3748;
}

.ingredient-amount {
  color: #667eea;
  font-weight: 500;
}

.original {
  color: #a0aec0;
  font-size: 0.85rem;
  margin-left: 5px;
}

/* 步骤 */
.steps-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.steps-section h2 {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 20px;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  display: flex;
  gap: 15px;
}

.step-number {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 1.1rem;
  color: #2d3748;
  margin-bottom: 8px;
}

.step-content p {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 10px;
}

.step-tips {
  display: flex;
  gap: 8px;
  padding: 10px 15px;
  background: #fffbeb;
  border-radius: 8px;
  color: #92400e;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.step-time {
  color: #718096;
  font-size: 0.85rem;
}

/* 小贴士 */
.tips-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.tips-section h2 {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 15px;
}

.tips-list {
  list-style: none;
  padding: 0;
}

.tips-list li {
  padding: 10px 0;
  padding-left: 20px;
  position: relative;
  color: #4a5568;
  border-bottom: 1px solid #f0f0f0;
}

.tips-list li:last-child {
  border-bottom: none;
}

.tips-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #667eea;
}

/* 常见问题 */
.mistakes-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.mistakes-section h2 {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 15px;
}

.mistakes-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.mistake-item {
  padding: 15px;
  background: #f7fafc;
  border-radius: 10px;
  border-left: 3px solid #f59e0b;
}

.mistake-title {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
}

.mistake-reason,
.mistake-solution {
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 5px;
}

/* 营养信息 */
.nutrition-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.nutrition-section h2 {
  font-size: 1.3rem;
  color: #2d3748;
  margin-bottom: 15px;
}

.nutrition-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.nutrition-item {
  padding: 10px 20px;
  background: #f0fff4;
  color: #276749;
  border-radius: 20px;
  font-size: 0.9rem;
}

.not-found {
  text-align: center;
  padding: 60px 20px;
}

.not-found p {
  color: #718096;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .detail-header {
    flex-direction: column;
    text-align: center;
  }
  
  .detail-emoji {
    font-size: 3rem;
  }
  
  .header-info h1 {
    font-size: 1.5rem;
  }
  
  .recipe-meta {
    justify-content: center;
  }
  
  .recipe-tags {
    justify-content: center;
  }
  
  .number-inputs {
    flex-direction: column;
    gap: 10px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>
