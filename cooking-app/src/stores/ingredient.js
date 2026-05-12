import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import ingredientsData from '../data/ingredients.json'
import seasoningsData from '../data/seasonings.json'

export const useIngredientStore = defineStore('ingredient', () => {
  // 食材数据
  const ingredients = ref(ingredientsData.ingredients)
  // 调料数据
  const seasonings = ref(seasoningsData.seasonings)
  
  // 分类
  const ingredientCategories = computed(() => {
    const cats = new Set(ingredients.value.map(i => i.category))
    return Array.from(cats)
  })
  
  const seasoningCategories = computed(() => {
    const cats = new Set(seasonings.value.map(s => s.category))
    return Array.from(cats)
  })
  
  // 根据 ID 获取食材
  const getIngredientById = (id) => {
    return ingredients.value.find(i => i.id === id)
  }
  
  // 根据 ID 获取调料
  const getSeasoningById = (id) => {
    return seasonings.value.find(s => s.id === id)
  }
  
  // 根据分类获取食材
  const getIngredientsByCategory = (category) => {
    return ingredients.value.filter(i => i.category === category)
  }
  
  // 根据分类获取调料
  const getSeasoningsByCategory = (category) => {
    return seasonings.value.filter(s => s.category === category)
  }
  
  // 搜索
  const search = (keyword) => {
    const lowerKeyword = keyword.toLowerCase()
    const matchedIngredients = ingredients.value.filter(i => 
      i.name.includes(keyword) || 
      i.aliases?.some(a => a.includes(keyword))
    )
    const matchedSeasonings = seasonings.value.filter(s => 
      s.name.includes(keyword) || 
      s.aliases?.some(a => a.includes(keyword))
    )
    return { ingredients: matchedIngredients, seasonings: matchedSeasonings }
  }
  
  return {
    ingredients,
    seasonings,
    ingredientCategories,
    seasoningCategories,
    getIngredientById,
    getSeasoningById,
    getIngredientsByCategory,
    getSeasoningsByCategory,
    search
  }
})
