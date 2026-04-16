<template>
  <aside id="fixed-sidebar" class="fixed-sidebar">
    <div class="sidebar-content">
      <div class="sidebar-section" style="padding: 0 20px;">
        <div id="clock-container" class="clock-container"></div>
      </div>

      <div class="sidebar-section" style="padding: 10px 20px;">
        <div id="polar-chart-container" class="chart-container">
          <div class="chart-wrapper"></div>
        </div>
      </div>

      <div class="sidebar-section" style="padding: 10px 20px;">
        <h3 class="sidebar-title">
          联系我：{{ emailText }}
        </h3>
        <div class="sidebar-actions">
          <a class="sidebar-link" :href="profile.resume" target="_blank" rel="noopener noreferrer">下载简历</a>
          <a class="sidebar-link" :href="profile.zhihu" target="_blank" rel="noopener noreferrer">掘金博客</a>
        </div>
        <ul class="social-icons">
          <li><a :href="profile.github" target="_blank" rel="noopener noreferrer"><i
                class="iconfont icon-github"></i></a></li>
          <li><a :href="profile.zhihu" target="_blank" rel="noopener noreferrer"><i
                class="iconfont icon-zhihu-copy"></i></a></li>
          <li><a :href="profile.email"><i class="iconfont icon-youxiang"></i></a></li>
          <li><button class="social-btn" @click="$emit('open-html', '微信联系方式', profile.weixin)"><i
                class="iconfont icon-weixin1"></i></button></li>
          <li><button class="social-btn" @click="$emit('open-html', 'QQ联系方式', profile.qq)"><i
                class="iconfont icon-qq"></i></button></li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

defineEmits(['open-html']);

const emailText = computed(() => {
  const matched = props.profile.email?.match(/mailto:([^?]+)/i);
  return matched?.[1] || '1643380863@qq.com';
});
</script>

<style scoped>
.sidebar-email {
  margin: 8px 0 12px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  text-align: center;
  word-break: break-all;
}

.sidebar-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 14px;
}

.sidebar-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 13px;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
}

.social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-btn .iconfont {
  color: #00d2d3;
}

@media (max-width: 480px) {
  .sidebar-actions {
    grid-template-columns: 1fr;
  }

  .sidebar-link {
    width: 100%;
  }
}
</style>
