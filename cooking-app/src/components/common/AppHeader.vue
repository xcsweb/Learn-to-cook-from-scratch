<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchKeyword = ref('')
const isMenuOpen = ref(false)

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({ path: '/search', query: { q: searchKeyword.value.trim() } })
  }
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header">
    <div class="header-container">
      <router-link to="/" class="logo">
        <span class="logo-icon">🍳</span>
        <span class="logo-text">厨艺入门</span>
      </router-link>
      
      <nav class="nav-desktop">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/ingredients" class="nav-link">食材调料</router-link>
        <router-link to="/recipes" class="nav-link">菜谱中心</router-link>
        <router-link to="/guide" class="nav-link">入门指南</router-link>
      </nav>
      
      <div class="search-box">
        <input 
          v-model="searchKeyword"
          type="text" 
          placeholder="搜索食材、菜谱..." 
          @keyup.enter="handleSearch"
          class="search-input"
        />
        <button @click="handleSearch" class="search-btn">搜索</button>
      </div>
      
      <button class="menu-toggle" @click="toggleMenu">
        <span class="menu-icon">☰</span>
      </button>
    </div>
    
    <nav v-if="isMenuOpen" class="nav-mobile">
      <router-link to="/" class="nav-link" @click="isMenuOpen = false">首页</router-link>
      <router-link to="/ingredients" class="nav-link" @click="isMenuOpen = false">食材调料</router-link>
      <router-link to="/recipes" class="nav-link" @click="isMenuOpen = false">菜谱中心</router-link>
      <router-link to="/guide" class="nav-link" @click="isMenuOpen = false">入门指南</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.logo-icon {
  font-size: 1.8rem;
}

.nav-desktop {
  display: flex;
  gap: 25px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
  padding: 5px 0;
  border-bottom: 2px solid transparent;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: white;
  border-bottom-color: white;
}

.search-box {
  display: flex;
  gap: 8px;
}

.search-input {
  padding: 8px 15px;
  border: none;
  border-radius: 20px;
  width: 200px;
  font-size: 0.9rem;
  outline: none;
}

.search-btn {
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-mobile {
  display: none;
  flex-direction: column;
  padding: 15px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-mobile .nav-link {
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
  
  .search-box {
    order: 3;
    width: 100%;
  }
  
  .search-input {
    flex: 1;
  }
  
  .menu-toggle {
    display: block;
  }
  
  .nav-mobile {
    display: flex;
  }
}
</style>
