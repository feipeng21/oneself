<template>
  <div>
    <video id="bg-video" ref="video" autoplay loop playsinline muted>
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <audio id="bg-audio" ref="audio" loop preload="auto">
      <source :src="audioUrl" type="audio/mpeg" />
    </audio>
    <div id="bg-overlay"></div>
    <div id="video-audio-control"><button id="audio-toggle-btn" @click="toggleAudio"><i class="audio-icon">{{ playing ?
      '🔊' : '🎵' }}</i><span class="audio-text">{{ playing ? '暂停音乐' : '播放音乐' }}</span></button></div>

    <div id="wrap">
      <SidebarPanel :profile="cfg.page7" @open-html="openHtml" />

      <main id="main-content" class="main-content">
        <nav id="top-navbar" :class="{ scrolled }">
          <div class="navbar-container">
            <div class="navbar-brand" @click="go('page1')">
              <span class="brand-text">PengFei的博客</span>
              <span class="brand-subtitle">前端工程师</span>
            </div>
            <ul class="navbar-menu">
              <li v-for="item in navItems" :key="item.id">
                <a class="nav-link" :class="{ active: active === item.id }" :href="`#${item.id}`"
                  @click.prevent="go(item.id)">{{ item.label }}</a>
              </li>
            </ul>
          </div>
        </nav>

        <section class="header-area header-bg">
          <div id="particles" class="particles"></div>
          <HeroSection :hero="cfg.page1" @navigate="go" />
          <AboutSection :about="cfg.page2" />
          <SkillsSection :skills="cfg.page3" />
          <MasteringSection :mastering="cfg.page4" />
          <ProjectsSection :projects="cfg.page5" />
          <AwardsSection :page="cfg.page6" @open-award="openAward" />
          <ContactSection :tags="techTags" />

          <div id="navbar">
            <div class="navbar-line"></div>
            <div class="navbar-list">
              <a v-for="item in navItems" :key="item.id" class="navbtn" :class="{ active: active === item.id }"
                :href="`#${item.id}`" @click.prevent="go(item.id)"></a>
            </div>
          </div>
        </section>
      </main>
    </div>

    <AwardModal v-if="award.open" :image="award.image" :title="award.title" @close="award.open = false" />
    <HtmlModal v-if="html.open" :title="html.title" :content="html.content" @close="html.open = false" />
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import cfg from './data/site-config.js';
import { audioUrl, videoUrl } from './utils/assets.js';
import { navItems, techTags } from './data/ui-data.js';
import SidebarPanel from './components/layout/SidebarPanel.vue';
import HeroSection from './components/sections/HeroSection.vue';
import AboutSection from './components/sections/AboutSection.vue';
import SkillsSection from './components/sections/SkillsSection.vue';
import MasteringSection from './components/sections/MasteringSection.vue';
import ProjectsSection from './components/sections/ProjectsSection.vue';
import AwardsSection from './components/sections/AwardsSection.vue';
import ContactSection from './components/sections/ContactSection.vue';
import AwardModal from './components/modals/AwardModal.vue';
import HtmlModal from './components/modals/HtmlModal.vue';

const scrolled = ref(false);
const active = ref('page1');
const playing = ref(false);
const award = ref({ open: false, image: '', title: '' });
const html = ref({ open: false, title: '', content: '' });
const video = ref(null);
const audio = ref(null);

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const openAward = (item) => { award.value = { open: true, image: item.image, title: item.title }; };
const openHtml = (title, content) => { html.value = { open: true, title, content }; };
const syncPlayState = () => { playing.value = !!audio.value && !audio.value.paused; };
const tryAutoPlayAudio = async () => {
  const target = audio.value;
  if (!target) return false;
  try {
    await target.play();
    syncPlayState();
    return true;
  } catch {
    syncPlayState();
    return false;
  }
};
const toggleAudio = async () => {
  const target = audio.value;
  if (!target) return;
  if (target.paused) {
    await tryAutoPlayAudio();
  } else {
    target.pause();
    syncPlayState();
  }
};
const onScroll = () => {
  scrolled.value = window.scrollY > 50;
  const currentY = window.scrollY + window.innerHeight / 2;
  document.querySelectorAll('.page').forEach((page) => {
    if (currentY >= page.offsetTop && currentY < page.offsetTop + page.offsetHeight) active.value = page.id;
  });
};
const setupAutoplayFallback = () => {
  const enableOnce = () => {
    tryAutoPlayAudio();
    window.removeEventListener('pointerdown', enableOnce);
    window.removeEventListener('keydown', enableOnce);
    window.removeEventListener('touchstart', enableOnce);
  };
  window.addEventListener('pointerdown', enableOnce, { once: true });
  window.addEventListener('keydown', enableOnce, { once: true });
  window.addEventListener('touchstart', enableOnce, { once: true });
};

onMounted(async () => {
  await nextTick();
  window.particlesJS && window.particlesJS.load('particles', 'lib/lizi/particles.json', () => { });
  window.TypeWriter && window.leConfig && setTimeout(() => new window.TypeWriter('typewriter-container', { strings: window.leConfig.typeWriterStrings }), 800);
  window.Clock && setTimeout(() => new window.Clock('clock-container', { showSeconds: true, showDate: true, format24: true, updateInterval: 1000 }), 1200);
  window.PolarChart && window.leConfig && setTimeout(() => new window.PolarChart('polar-chart-container', window.leConfig.polarChart), 1600);

  if (video.value) {
    video.value.muted = true;
    video.value.play().catch(() => { });
  }

  if (audio.value) {
    audio.value.volume = 0.3;
    audio.value.autoplay = true;
    audio.value.addEventListener('play', syncPlayState);
    audio.value.addEventListener('pause', syncPlayState);
    await tryAutoPlayAudio();
    setupAutoplayFallback();
  }

  onScroll();
  window.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  if (audio.value) {
    audio.value.removeEventListener('play', syncPlayState);
    audio.value.removeEventListener('pause', syncPlayState);
  }
});
</script>

<style>
@font-face {
  font-family: "Digital-Play";
  src: url("/fonts/Digital-Play-Italic-St-1.ttf");
  font-display: swap;
}

.modal-mask {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-panel {
  position: relative;
  width: min(560px, 92vw);
  max-height: 84vh;
  overflow: auto;
  padding: 24px;
  border-radius: 20px;
  background: rgba(15, 15, 15, 0.96);
  border: 1px solid rgba(255, 107, 53, 0.35);
  color: #fff;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 14px;
  background: none;
  border: 0;
  color: #fff;
  font-size: 28px;
  cursor: pointer;
}
</style>
