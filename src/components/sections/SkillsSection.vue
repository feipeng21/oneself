<template>
  <section class="page page3" id="page3">
    <div class="page3-box container">
      <h1 class="page-title">My Skills</h1>
      <div class="row">
        <div v-for="item in skills" :key="item.title" class="col-xs-12 col-md-3 box-item">
          <div class="box-xz"><i class="iconfont" :class="item.icon"></i></div>
          <div class="box-info">
            <h5>{{ item.title }}</h5>
            <p v-for="msg in item.msg" :key="msg">{{ msg }}<br /></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  skills: {
    type: Array,
    required: true,
  },
});
</script>
