<template>
  <section class="page page4" id="page4">
    <div class="page3-box container">
      <div class="row">
        <div class="col-xs-12 col-md-6">
          <div class="box-left">
            <h1 class="page-title">My Mastering</h1>
            <div class="left-body">
              <ul>
                <li v-for="course in mastering.course" :key="course.date">
                  <div class="title orange"></div>
                  <div class="date">{{ course.date }}</div>
                  <div class="desc">
                    <h3>{{ course.desc.title }}</h3>
                    <h4 v-for="item in course.desc.list" :key="item">{{ item }}</h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-6 box-right">
          <div class="row singlelist">
            <div v-for="item in mastering.singlelist" :key="item.title" class="col-lg-6">
              <div class="slist-item">
                <div class="sitem-icon"><i class="iconfont icon-biaoqian"></i></div>
                <div class="sitem-info"><span>{{ item.title }}</span><h5>{{ item.text }}</h5></div>
              </div>
            </div>
          </div>
          <div class="proresslist row">
            <div v-for="item in mastering.proresslist" :key="item.title" class="proress col-xs-12 col-md-6">
              <div class="propress-title">{{ item.title }}</div>
              <div class="propress-bar"><div class="bar-propress" :style="{ width: item.value }"><span>{{ item.value }}</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  mastering: {
    type: Object,
    required: true,
  },
});
</script>
