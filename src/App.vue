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

    <transition name="music-prompt-fade">
      <div v-if="musicPrompt" class="music-prompt-mask" @click.self="handleMusicPromptConfirm">
        <div class="music-prompt-card">
          <div class="music-prompt-badge">MUSIC</div>
          <h3>背景音乐待开启</h3>
          <p>浏览器已拦截自动播放，点击下方按钮即可开启本站背景音乐。</p>
          <div class="music-prompt-actions">
            <button class="music-prompt-btn primary" @click="handleMusicPromptConfirm">打开音乐</button>
          </div>
        </div>
      </div>
    </transition>

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
const musicPrompt = ref(false);
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
    musicPrompt.value = false;
    syncPlayState();
    return true;
  } catch {
    musicPrompt.value = true;
    syncPlayState();
    return false;
  }
};
const handleMusicPromptConfirm = async () => {
  await tryAutoPlayAudio();
};
const toggleAudio = async () => {
  const target = audio.value;
  if (!target) return;
  if (target.paused) {
    await tryAutoPlayAudio();
  } else {
    target.pause();
    musicPrompt.value = false;
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

.music-prompt-fade-enter-active,
.music-prompt-fade-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.music-prompt-fade-enter-from,
.music-prompt-fade-leave-to {
  opacity: 0;
}

.music-prompt-mask {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.5);
}

.music-prompt-card {
  width: min(420px, 100%);
  padding: 28px 24px;
  border-radius: 24px;
  border: 1px solid rgba(75, 211, 255, 0.3);
  background:
    radial-gradient(circle at top, rgba(72, 187, 255, 0.22), transparent 55%),
    linear-gradient(145deg, rgba(7, 17, 30, 0.96), rgba(14, 30, 46, 0.92));
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  color: #f5fbff;
  text-align: center;
}

.music-prompt-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 84px;
  margin-bottom: 14px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(92, 219, 255, 0.14);
  border: 1px solid rgba(92, 219, 255, 0.32);
  color: #73e0ff;
  font-size: 12px;
  letter-spacing: 0.28em;
}

.music-prompt-card h3 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.music-prompt-card p {
  margin: 14px 0 0;
  color: rgba(235, 247, 255, 0.78);
  font-size: 15px;
  line-height: 1.75;
}

.music-prompt-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.music-prompt-btn {
  min-width: 124px;
  height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.music-prompt-btn:hover {
  transform: translateY(-1px);
}

.music-prompt-btn.primary {
  background: linear-gradient(135deg, #4ad9ff, #2d8cff);
  box-shadow: 0 12px 28px rgba(45, 140, 255, 0.32);
  color: #02111d;
}

.music-prompt-btn.ghost {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f5fbff;
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

@media (max-width: 480px) {
  .music-prompt-card {
    padding: 24px 18px;
    border-radius: 20px;
  }

  .music-prompt-card h3 {
    font-size: 24px;
  }

  .music-prompt-actions {
    flex-direction: column;
  }

  .music-prompt-btn {
    width: 100%;
  }
}
</style>
