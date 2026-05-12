<script setup>
const sections = [
  {
    title: '厨房必备工具',
    icon: '🔪',
    color: '#667eea',
    items: [
      { name: '菜刀', icon: '🔪', desc: '一把好用的菜刀是厨房的基础，建议选择中式菜刀或三德刀' },
      { name: '砧板', icon: '🪵', desc: '建议准备两块，生熟分开使用' },
      { name: '炒锅', icon: '🍳', desc: '铁锅或不粘锅均可，直径30cm左右适合家庭使用' },
      { name: '锅铲', icon: '🥄', desc: '配合锅具选择，不粘锅需用木质或硅胶铲' },
      { name: '汤勺', icon: '🥄', desc: '用于盛汤、搅拌' },
      { name: '量勺', icon: '📏', desc: '精确控制调料用量，新手必备' }
    ]
  },
  {
    title: '基础调料清单',
    icon: '🧂',
    color: '#f59e0b',
    items: [
      { name: '盐', icon: '🧂', desc: '最基础的调味品' },
      { name: '糖', icon: '🍬', desc: '提鲜增甜' },
      { name: '生抽', icon: '🫗', desc: '调味提鲜' },
      { name: '老抽', icon: '🫗', desc: '上色增香' },
      { name: '料酒', icon: '🍶', desc: '去腥增香' },
      { name: '醋', icon: '🍾', desc: '去腥解腻' },
      { name: '食用油', icon: '🫒', desc: '烹饪必备' },
      { name: '葱、姜、蒜', icon: '🧄', desc: '中式烹饪三宝' }
    ]
  },
  {
    title: '基础技能',
    icon: '👨‍🍳',
    color: '#10b981',
    items: [
      { name: '切菜技巧', icon: '🔪', desc: '先学会切片，再学切丝、切丁。切菜时手指弯曲，用指关节抵住刀面' },
      { name: '火候控制', icon: '🔥', desc: '大火爆炒、中火煎炸、小火慢炖。新手建议从中火开始' },
      { name: '调味顺序', icon: '🧂', desc: '一般顺序：料酒 → 酱油 → 盐 → 糖 → 醋（出锅前）' },
      { name: '焯水技巧', icon: '💧', desc: '肉类冷水下锅，蔬菜开水下锅，可去腥去涩' }
    ]
  },
  {
    title: '安全须知',
    icon: '⚠️',
    color: '#ef4444',
    items: [
      { name: '用刀安全', icon: '🔪', desc: '切菜时专注，不要分心。刀不用时放回原位' },
      { name: '用火安全', icon: '🔥', desc: '人走火灭，油锅起火时盖上锅盖，不要用水浇' },
      { name: '防烫伤', icon: '♨️', desc: '使用隔热手套，热锅热油小心溅烫' },
      { name: '防滑倒', icon: '⚠️', desc: '保持地面干燥，油渍及时清理' }
    ]
  },
  {
    title: '新手建议',
    icon: '💡',
    color: '#8b5cf6',
    items: [
      { name: '从简单开始', icon: '🥚', desc: '先学番茄炒蛋、葱花炒蛋等简单菜品，建立信心' },
      { name: '备好食材', icon: '🥬', desc: '开始烹饪前，把所有食材和调料准备好，避免手忙脚乱' },
      { name: '看懂菜谱', icon: '📖', desc: '仔细阅读菜谱步骤，理解每一步的目的' },
      { name: '多练习', icon: '💪', desc: '厨艺是技能，需要反复练习才能熟练' }
    ]
  }
]
</script>

<template>
  <div class="guide-page">
    <div class="page-header">
      <div class="header-icon">📚</div>
      <h1>入门指南</h1>
      <p>从零开始，一步步掌握厨艺基础</p>
    </div>
    
    <div class="guide-content">
      <section v-for="section in sections" :key="section.title" class="guide-section" :style="{ '--section-color': section.color }">
        <h2 class="section-title">
          <span class="section-icon-bg">
            <span class="section-icon">{{ section.icon }}</span>
          </span>
          {{ section.title }}
        </h2>
        <div class="items-grid">
          <div v-for="item in section.items" :key="item.name" class="guide-item">
            <div class="item-icon-wrapper">
              <span class="item-icon">{{ item.icon }}</span>
            </div>
            <div class="item-content">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    <div class="start-cooking">
      <div class="start-icon">👨‍🍳</div>
      <h2>准备好开始了吗？</h2>
      <p>从最简单的菜谱开始，一步步提升厨艺</p>
      <router-link to="/recipes" class="start-btn">
        <span class="btn-icon">🍳</span>
        浏览菜谱
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.guide-page {
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
}

.header-icon {
  font-size: 4rem;
  margin-bottom: 15px;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.page-header p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.guide-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.guide-section {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.guide-section:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.4rem;
  color: #2d3748;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.section-icon-bg {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--section-color), var(--section-color));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.section-icon {
  font-size: 1.8rem;
  filter: grayscale(0.3);
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
}

.guide-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 18px;
  background: #f8fafc;
  border-radius: 14px;
  border-left: 4px solid var(--section-color);
  transition: all 0.3s;
}

.guide-item:hover {
  background: #f0f4ff;
  transform: translateX(5px);
}

.item-icon-wrapper {
  width: 45px;
  height: 45px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.item-icon {
  font-size: 1.5rem;
}

.item-content {
  flex: 1;
}

.item-name {
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 6px;
  font-size: 1.05rem;
}

.item-desc {
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.5;
}

.start-cooking {
  text-align: center;
  padding: 50px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin-top: 40px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

.start-icon {
  font-size: 4rem;
  margin-bottom: 15px;
}

.start-cooking h2 {
  color: white;
  margin-bottom: 10px;
  font-size: 1.6rem;
}

.start-cooking p {
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 25px;
  font-size: 1.05rem;
}

.start-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 35px;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn-icon {
  font-size: 1.3rem;
}

@media (max-width: 768px) {
  .page-header {
    padding: 25px 20px;
  }
  
  .header-icon {
    font-size: 3rem;
  }
  
  .page-header h1 {
    font-size: 1.6rem;
  }
  
  .guide-section {
    padding: 20px;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
  
  .section-icon-bg {
    width: 42px;
    height: 42px;
  }
  
  .items-grid {
    grid-template-columns: 1fr;
  }
  
  .guide-item {
    padding: 15px;
  }
  
  .start-cooking {
    padding: 35px 25px;
  }
  
  .start-icon {
    font-size: 3rem;
  }
}
</style>
