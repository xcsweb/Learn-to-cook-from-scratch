import { usePreferenceStore } from '../stores/preference'

/**
 * 用量计算器
 * 根据人数和口味偏好计算调整后的用量
 */

// 口味调整系数
const tasteAdjustments = {
  light: 0.8,    // 清淡口：减少 20%
  standard: 1.0, // 标准口：不变
  heavy: 1.2     // 重口味：增加 20%
}

// 地域调整系数（针对特定调料）
const regionAdjustments = {
  standard: { salt: 1.0, sugar: 1.0, oil: 1.0, chili: 1.0 },
  south: { salt: 0.9, sugar: 1.2, oil: 0.9, chili: 0.8 },
  north: { salt: 1.2, sugar: 0.9, oil: 1.2, chili: 1.0 },
  sichuan: { salt: 1.0, sugar: 0.9, oil: 1.1, chili: 1.5 }
}

/**
 * 计算调整后的用量
 * @param {Object} ingredient - 食材/调料信息
 * @param {number} baseAmount - 基础用量
 * @param {number} baseServings - 基础份数
 * @returns {Object} 调整后的用量信息
 */
export function calculateAmount(ingredient, baseAmount, baseServings = 2) {
  const preferenceStore = usePreferenceStore()
  
  // 计算人数调整
  const servings = preferenceStore.totalServings()
  const servingRatio = servings / baseServings
  
  // 基础调整（按人数）
  let adjustedAmount = baseAmount * servingRatio
  
  // 口味调整
  const tasteFactor = tasteAdjustments[preferenceStore.tastePreference] || 1.0
  
  // 地域调整（仅对调料生效）
  let regionFactor = 1.0
  if (ingredient.category === 'seasoning' || ingredient.type === 'seasoning') {
    const seasoningType = getSeasoningType(ingredient.id)
    const regionAdj = regionAdjustments[preferenceStore.regionPreference] || regionAdjustments.standard
    regionFactor = regionAdj[seasoningType] || 1.0
  }
  
  // 最终调整
  adjustedAmount = adjustedAmount * tasteFactor * regionFactor
  
  // 格式化输出
  return {
    original: baseAmount,
    adjusted: Math.round(adjustedAmount * 10) / 10,
    unit: ingredient.unit || '',
    servingRatio: Math.round(servingRatio * 100) / 100,
    tasteFactor,
    regionFactor,
    explanation: generateExplanation(servingRatio, tasteFactor, regionFactor)
  }
}

/**
 * 根据调料 ID 判断调料类型
 */
function getSeasoningType(id) {
  const typeMap = {
    'salt': 'salt',
    'sugar': 'sugar',
    'light-soy-sauce': 'salt',
    'dark-soy-sauce': 'salt',
    'cooking-wine': 'salt',
    'vinegar': 'salt',
    'oyster-sauce': 'salt',
    'chili-oil': 'chili',
    'sichuan-pepper': 'chili',
    'cooking-oil': 'oil'
  }
  return typeMap[id] || 'salt'
}

/**
 * 生成调整说明
 */
function generateExplanation(servingRatio, tasteFactor, regionFactor) {
  const explanations = []
  
  if (servingRatio !== 1) {
    if (servingRatio > 1) {
      explanations.push(`人数增加 ${Math.round((servingRatio - 1) * 100)}%`)
    } else {
      explanations.push(`人数减少 ${Math.round((1 - servingRatio) * 100)}%`)
    }
  }
  
  if (tasteFactor !== 1) {
    if (tasteFactor < 1) {
      explanations.push('清淡口味，调味料减少')
    } else {
      explanations.push('重口味，调味料增加')
    }
  }
  
  if (regionFactor !== 1) {
    explanations.push('根据地域偏好调整')
  }
  
  return explanations.join('；') || '按标准用量'
}

/**
 * 批量计算菜谱用量
 * @param {Object} recipe - 菜谱信息
 * @returns {Array} 调整后的食材列表
 */
export function calculateRecipeAmounts(recipe) {
  const preferenceStore = usePreferenceStore()
  const baseServings = recipe.servings || 2
  
  return recipe.ingredients.map(item => {
    return {
      ...item,
      calculation: calculateAmount(
        { id: item.id, category: item.type, unit: item.unit },
        item.amount,
        baseServings
      )
    }
  })
}

export default {
  calculateAmount,
  calculateRecipeAmounts
}
