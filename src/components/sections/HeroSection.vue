<template>
  <section class="page page1" id="page1">
    <div class="page1-box container animateload">
      <div class="row">
        <div class="col-lg-10 col-lg-offset-1 box-page">
          <h1><span class="title-typing">{{ hero.titleEn }}</span></h1>
          <p class="box-info"><span class="subtitle-typing">{{ hero.title }}</span></p>
          <p class="box-font">
            I hope I could keep advancing and let my life shine as a precious stone.
            <span class="box-change">and let my life shine as a precious stone.</span>
          </p>
          <div id="typewriter-container" style="margin-top: 30px; min-height: 80px"></div>
        </div>
      </div>
      <a class="next-bt navbtn" href="#next-one" @click.prevent="$emit('navigate', 'next-one')"><span>Read more</span></a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  hero: {
    type: Object,
    required: true,
  },
});

defineEmits(['navigate']);
</script>
