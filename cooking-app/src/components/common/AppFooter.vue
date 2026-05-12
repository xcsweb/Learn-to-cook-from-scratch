<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>关于我们</h4>
          <p>厨艺入门致力于帮助零基础新手快速掌握烹饪技能，所有内容均基于科学依据，让您学得放心、做得安心。</p>
        </div>
        
        <div class="footer-section">
          <h4>快速导航</h4>
          <div class="footer-links">
            <router-link to="/">首页</router-link>
            <router-link to="/ingredients">食材调料</router-link>
            <router-link to="/recipes">菜谱中心</router-link>
            <router-link to="/guide">入门指南</router-link>
          </div>
        </div>
        
        <div class="footer-section">
          <h4>联系我们</h4>
          <p>如有问题或建议，欢迎反馈</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>© 2024 厨艺入门 - 让每个人都能做出美味佳肴</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #2d3748;
  color: #e2e8f0;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-section h4 {
  color: white;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.footer-section p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #a0aec0;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #4a5568;
  text-align: center;
}

.footer-bottom p {
  font-size: 0.85rem;
  color: #718096;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
