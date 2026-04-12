<template>
  <div class="modal-mask" @click.self="$emit('close')">
    <div class="modal-panel">
      <button class="modal-close" @click="$emit('close')">&times;</button>
      <img :src="awardUrl(image)" style="max-width: 100%; max-height: 70vh; border-radius: 14px; display: block; margin: auto" />
      <p style="margin-top: 16px; text-align: center; font-size: 18px; font-weight: 700">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
import { awardUrl } from '../../utils/assets.js';

defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

defineEmits(['close']);
</script>
