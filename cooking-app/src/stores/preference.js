import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export const usePreferenceStore = defineStore('preference', () => {
  // 用户偏好设置，持久化到 localStorage
  const tastePreference = useLocalStorage('taste-preference', 'standard') // light, standard, heavy
  const regionPreference = useLocalStorage('region-preference', 'standard') // south, north, sichuan, standard
  const adultCount = useLocalStorage('adult-count', 2)
  const childCount = useLocalStorage('child-count', 0)
  
  // 口味偏好选项
  const tasteOptions = [
    { value: 'light', label: '清淡口', description: '调味料减少20%' },
    { value: 'standard', label: '标准口', description: '按原配方用量' },
    { value: 'heavy', label: '重口味', description: '调味料增加20%' }
  ]
  
  // 地域偏好选项
  const regionOptions = [
    { value: 'standard', label: '标准', description: '通用口味' },
    { value: 'south', label: '南方口味', description: '偏甜、少盐' },
    { value: 'north', label: '北方口味', description: '偏咸、重油' },
    { value: 'sichuan', label: '川湘口味', description: '重辣、重麻' }
  ]
  
  // 计算总人数（大人 + 小孩 * 0.6）
  const totalServings = () => {
    return adultCount.value + childCount.value * 0.6
  }
  
  // 重置偏好
  const resetPreferences = () => {
    tastePreference.value = 'standard'
    regionPreference.value = 'standard'
    adultCount.value = 2
    childCount.value = 0
  }
  
  return {
    tastePreference,
    regionPreference,
    adultCount,
    childCount,
    tasteOptions,
    regionOptions,
    totalServings,
    resetPreferences
  }
})
