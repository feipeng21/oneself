<template>
  <section class="page page2" id="next-one">
    <div class="page2-box container">
      <div class="row">
        <div class="col-xs-12 col-md-5">
          <div class="box-image"><img :src="imgUrl(about.authorImg)" /></div>
        </div>
        <div class="col-xs-12 col-md-7 box-info">
          <h1 class="page-title">About Me</h1>
          <h2>- 幸会</h2>
          <p>{{ about.xinhui }}</p>
          <h2>- 职位</h2>
          <p>{{ about.qiuzhi }}</p>
          <h2>- 关于我</h2>
          <p>{{ about.guanyuwo }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { imgUrl } from '../../utils/assets.js';

defineProps({
  about: {
    type: Object,
    required: true,
  },
});
</script>
