<template>
  <section class="page page7" id="page7">
    <div class="page3-box container">
      <div class="row">
        <div class="col-lg-10 col-lg-offset-1">
          <div class="box-page">
            <h2>PLEASE <span>CONTACT ME</span></h2>
            <ul class="page-tag">
              <li v-for="item in tags" :key="item.text" :style="{ color: item.color }">{{ item.text }}</li>
            </ul>
            <div class="contact-info">
              <p>电话：17803709890</p>
              <p>邮箱：1643380863@qq.com</p>
              <p>GitHub：github.com/feipeng21</p>
              <p>方向：前端开发 / React Native / Vue / TypeScript</p>
              <p>期待与您交流前端开发、实习与校招机会。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  tags: {
    type: Array,
    required: true,
  },
});
</script>
