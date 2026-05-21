<template>
  <section class="page page6" id="page6">
    <div class="page3-box container">
      <h1 class="page-title">获奖经历 & 个人能力</h1>
      <div class="row" style="margin-bottom: 40px">
        <div class="col-xs-12">
          <div class="self-evaluation"
            style="text-align: center; padding: 20px; background: rgba(255,255,255,.05); border-radius: 10px; border: 1px solid rgba(255,107,53,.3)">
            <h3 style="color: #ff6b35; margin-bottom: 15px">✨ 自我评价</h3>
            <p style="color: #ddd; line-height: 1.8; font-size: 16px">{{ page.selfEvaluation }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8">
          <div class="box-left">
            <h2 style="color: #ff6b35; margin-bottom: 20px">🏆 竞赛获奖经历</h2>
            <div class="award-list">
              <div v-for="award in page.awards" :key="award.title + award.date" class="award-item"
                style="box-shadow: 0px 0px 1px #ff6b35; margin-bottom: 15px; padding: 15px; background: rgba(255,255,255,.1); border-radius: 8px; position: relative; cursor: pointer"
                @click="$emit('open-award', award)">
                <h4 style="color: #fff; margin-bottom: 8px; padding-right: 80px">{{ award.title }}</h4>
                <p style="color: #ff6b35; margin: 5px 0; font-weight: 700">{{ award.level }}</p>
                <p style="color: #aaa; margin: 0; font-size: 14px">📅 {{ award.date }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-4">
          <div class="box-right">
            <h2 style="color: #ff6b35; margin-bottom: 20px">💪 个人能力</h2>
            <div class="ability-list">
              <div v-for="ability in page.abilities" :key="ability.title" class="ability-item"
                style="box-shadow: 0px 0px 1px #ff6b35; margin-bottom: 15px; padding: 15px; background: rgba(255,255,255,.1); border-radius: 8px">
                <h4 style="color: #fff; margin-bottom: 8px; font-size: 16px">{{ ability.title }}</h4>
                <p style="color: #ccc; margin: 0; line-height: 1.6; font-size: 14px">{{ ability.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  page: {
    type: Object,
    required: true,
  },
});

defineEmits(['open-award']);
</script>
