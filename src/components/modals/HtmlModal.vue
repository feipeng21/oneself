<template>
  <div class="modal-mask" @click.self="$emit('close')">
    <div class="modal-panel">
      <button class="modal-close" @click="$emit('close')">&times;</button>
      <h3 style="margin-top: 0; color: #ff6b35">{{ title }}</h3>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

defineEmits(['close']);
</script>
