<template>
  <section class="page page5" id="page5">
    <div class="page3-box container">
      <h1 class="page-title">My Production</h1>
      <div class="row">
        <div v-for="item in projects" :key="item.title" class="col-lg-4 col-md-6 col-sm-12">
          <a class="box-item" :href="item.href" target="_blank">
            <div class="item-zhez">
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </div>
            <img :src="imgUrl(item.image)" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { imgUrl } from '../../utils/assets.js';

defineProps({
  projects: {
    type: Array,
    required: true,
  },
});
</script>
