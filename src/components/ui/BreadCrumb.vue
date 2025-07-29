<template>
  <div class="w-full bg-main">
    <div
      :class="{ '!text-[10px]': isMobile }"
      class="container py-[9px] text-[#333333] text-[13px]"
    >
      <a :class="{ '!text-[10px]': isMobile }"> Trang chủ </a>
      <span class="!mx-1 text-[#ccc]"> / </span>
      <template v-for="(item, index) in dataBreadcrumb" :key="index">
        <a :class="{ '!cursor-default': index == dataBreadcrumb.length - 1 }">
          {{ item }}
          <span v-if="index !== dataBreadcrumb.length - 1" class="!mx-1 text-[#ccc]"> / </span>
        </a>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'

export default {
  name: 'BreadCrumb',
  mixins: [deviceMixin],
  props: {
    dataBreadcrumb: {
      type: Array,
      default: [],
    },
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)

    return {
      isMobile,
      isDesktop,
    }
  },
}
</script>
