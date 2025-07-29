<template>
  <div
    v-if="!isDesktop"
    class="fixed bottom-0 left-0 right-0 z-999 h-[45px] w-full border-t border-t-[#e7e7e7] bg-white px-2.5 py-[5px]"
  >
    <div class="h-full text-black flex items-center justify-between">
      <button><i class="fa-solid fa-phone"></i></button>
      <button><i class="fa-solid fa-envelope"></i></button>
      <button><i class="fa-solid fa-location-dot"></i></button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'

export default {
  name: 'ToolbarMobile',
  mixins: [deviceMixin],

  setup() {
    const isDesktop = ref(false)

    return {
      isDesktop,
    }
  },
}
</script>

<style scoped>
button {
  width: 100%;
}
</style>
