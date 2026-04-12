<template>
  <aside id="fixed-sidebar" class="fixed-sidebar">
    <div class="sidebar-content">
      <div class="sidebar-section">
        <div id="clock-container" class="clock-container"></div>
      </div>

      <div class="sidebar-section">
        <div id="polar-chart-container" class="chart-container">
          <div class="chart-wrapper"></div>
        </div>
      </div>

      <div class="sidebar-section">
        <h3 class="sidebar-title">
          联系我：1643380863@qq.com
        </h3>
        <ul class="social-icons">
          <li><a href="https://github.com/feipeng21" target="_blank"><i class="iconfont icon-github"></i></a></li>
          <li><a :href="profile.zhihu" target="_blank"><i class="iconfont icon-zhihu-copy"></i></a></li>
          <li><a href="mailto:1643380863@qq.com"><i class="iconfont icon-youxiang"></i></a></li>
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
defineProps({
  profile: {
    type: Object,
    required: true,
  },
});

defineEmits(['open-html']);
</script>

<style scoped>
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
</style>
