import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import recipesData from '../data/recipes.json'

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref(recipesData.recipes)
  
  // 获取所有标签
  const allTags = computed(() => {
    const tags = new Set()
    recipes.value.forEach(r => {
      r.tags?.forEach(t => tags.add(t))
    })
    return Array.from(tags)
  })
  
  // 根据 ID 获取菜谱
  const getRecipeById = (id) => {
    return recipes.value.find(r => r.id === id)
  }
  
  // 根据难度筛选
  const getRecipesByDifficulty = (difficulty) => {
    return recipes.value.filter(r => r.difficulty === difficulty)
  }
  
  // 根据标签筛选
  const getRecipesByTag = (tag) => {
    return recipes.value.filter(r => r.tags?.includes(tag))
  }
  
  // 搜索菜谱
  const searchRecipes = (keyword) => {
    const lowerKeyword = keyword.toLowerCase()
    return recipes.value.filter(r => 
      r.name.includes(keyword) || 
      r.tags?.some(t => t.includes(keyword))
    )
  }
  
  return {
    recipes,
    allTags,
    getRecipeById,
    getRecipesByDifficulty,
    getRecipesByTag,
    searchRecipes
  }
})
