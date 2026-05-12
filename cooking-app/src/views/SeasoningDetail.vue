<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useIngredientStore } from '../stores/ingredient'

const route = useRoute()
const ingredientStore = useIngredientStore()

const seasoning = computed(() => {
  return ingredientStore.getSeasoningById(route.params.id)
})

const getEmoji = (id) => {
  const emojiMap = {
    'salt': '🧂', 'sugar': '🍬', 'light-soy-sauce': '🫗', 'dark-soy-sauce': '🫗',
    'cooking-wine': '🍶', 'vinegar': '🍾', 'oyster-sauce': '🫗', 'cooking-oil': '🫒'
  }
  return emojiMap[id] || '🧂'
}
</script>

<template>
  <div class="detail-page" v-if="seasoning">
    <router-link to="/ingredients" class="back-link">← 返回食材调料库</router-link>
    
    <div class="detail-header">
      <span class="detail-emoji">{{ getEmoji(seasoning.id) }}</span>
      <div class="header-info">
        <h1>{{ seasoning.name }}</h1>
        <div class="aliases" v-if="seasoning.aliases?.length">
          别名：{{ seasoning.aliases.join('、') }}
        </div>
      </div>
    </div>
    
    <div class="detail-content">
      <section class="content-section">
        <h2>📝 简介</h2>
        <p>{{ seasoning.description }}</p>
        <div class="difference" v-if="seasoning.difference">
          <strong>💡 区别说明：</strong>{{ seasoning.difference }}
        </div>
      </section>
      
      <section class="content-section">
        <h2>✨ 主要作用</h2>
        <div class="tags">
          <span v-for="func in seasoning.functions" :key="func" class="tag">{{ func }}</span>
        </div>
      </section>
      
      <section class="content-section" v-if="seasoning.usageGuide">
        <h2>📖 用法指南</h2>
        <div class="usage-info">
          <div class="standard-amount">
            <strong>标准用量：</strong>{{ seasoning.usageGuide.standardAmount }}
          </div>
          <div class="daily-limit" v-if="seasoning.usageGuide.dailyLimit">
            <strong>每日建议：</strong>{{ seasoning.usageGuide.dailyLimit }}
          </div>
          <div class="usage-scenarios">
            <div v-for="(scenario, index) in seasoning.usageGuide.usageScenarios" :key="index" class="scenario-card">
              <h4>{{ scenario.scenario }}</h4>
              <p>{{ scenario.method }}</p>
              <div class="tips" v-if="scenario.tips">💡 {{ scenario.tips }}</div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="content-section" v-if="seasoning.types?.length">
        <h2>🏷️ 常见种类</h2>
        <div class="types-list">
          <div v-for="type in seasoning.types" :key="type.name" class="type-item">
            <span class="type-name">{{ type.name }}</span>
            <span class="type-usage">{{ type.usage }}</span>
          </div>
        </div>
      </section>
      
      <section class="content-section" v-if="seasoning.substitution">
        <h2>🔄 替代方案</h2>
        <p>{{ seasoning.substitution }}</p>
      </section>
      
      <section class="content-section" v-if="seasoning.selectionGuide">
        <h2>🔍 选购与保存</h2>
        <div class="selection-info">
          <div class="info-item">
            <strong>选购：</strong>{{ seasoning.selectionGuide.quality }}
          </div>
          <div class="info-item">
            <strong>保存：</strong>{{ seasoning.selectionGuide.storage }}
          </div>
        </div>
      </section>
      
      <section class="content-section" v-if="seasoning.healthTips">
        <h2>💚 健康提示</h2>
        <p>{{ seasoning.healthTips }}</p>
      </section>
      
      <section class="content-section" v-if="seasoning.scientificReferences?.length">
        <h2>📚 科学依据</h2>
        <div class="references">
          <div v-for="ref in seasoning.scientificReferences" :key="ref.title" class="reference-item">
            <div class="ref-title">{{ ref.title }}</div>
            <div class="ref-source">{{ ref.source }} · {{ ref.year }}</div>
            <div class="ref-finding">{{ ref.finding }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
  
  <div v-else class="not-found">
    <p>未找到该调料信息</p>
    <router-link to="/ingredients">返回食材调料库</router-link>
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
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  border-radius: 15px;
}

.detail-emoji {
  font-size: 4rem;
}

.header-info h1 {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 8px;
}

.aliases {
  color: #718096;
  font-size: 0.95rem;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.content-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.content-section h2 {
  font-size: 1.2rem;
  color: #2d3748;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.content-section p {
  color: #4a5568;
  line-height: 1.7;
}

.difference {
  margin-top: 15px;
  padding: 15px;
  background: #fffbeb;
  border-radius: 8px;
  border-left: 3px solid #f59e0b;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 6px 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
}

.standard-amount,
.daily-limit {
  padding: 15px;
  background: #f0f4ff;
  border-radius: 8px;
  margin-bottom: 10px;
}

.usage-scenarios {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
}

.scenario-card {
  padding: 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}

.scenario-card h4 {
  color: #667eea;
  margin-bottom: 8px;
}

.scenario-card p {
  margin-bottom: 8px;
}

.tips {
  color: #718096;
  font-size: 0.9rem;
  font-style: italic;
}

.types-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.type-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  background: #f7fafc;
  border-radius: 8px;
}

.type-name {
  font-weight: 600;
  color: #2d3748;
}

.type-usage {
  color: #718096;
}

.selection-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  color: #4a5568;
}

.references {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.reference-item {
  padding: 15px;
  background: #f7fafc;
  border-left: 3px solid #667eea;
  border-radius: 0 8px 8px 0;
}

.ref-title {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 5px;
}

.ref-source {
  font-size: 0.85rem;
  color: #718096;
  margin-bottom: 8px;
}

.ref-finding {
  font-size: 0.9rem;
  color: #4a5568;
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
  
  .type-item {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
