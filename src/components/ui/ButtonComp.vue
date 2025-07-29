<template>
  <button
    :class="{
      'border-tsun-red hover:border-[var(--blue-color)] before:bg-[var(--red-color)]': isRed,
      'border-tsun-blue hover:border-[var(--blue-color)] before:bg-[var(--blue-color)]': isBlue,
      ' w-fit !text-xs !px-6 !py-4.5': btnCart,
    }"
    class="relative !border before:!text-white text-white hover:text-black btn-transition text-sm uppercase px-4 py-[15px] cursor-pointer"
  >
    <slot></slot> {{ text }}
  </button>
</template>
<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
export default {
  name: 'ButtonComp',
  mixins: [deviceMixin],
  props: {
    text: String,
    isRed: {
      type: Boolean,
      default: false,
    },
    isBlue: {
      type: Boolean,
      default: false,
    },
    btnCart: {
      type: Boolean,
      default: false,
    },
  },

  setup() {
    const isMobile = ref(false)
    return {
      isMobile,
    }
  },
}
</script>
