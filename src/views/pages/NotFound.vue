<template>
  <div :class="minHeight" class="flex items-center justify-center">
    <div class="container !my-9">
      <div
        class="text-center after:content-[''] after:block after:bg-[#252a2b] after:w-[80px] after:h-[4px] after:!my-[30px] after:!ml-auto after:!mr-auto"
      >
        <h1 :class="isDesktop ? 'text-[40px]' : 'text-[30px]'" class="text-black font-bold">
          {{ title }}
        </h1>
        <p class="text-black text-sm text-[#080808] opacity-[.66] !mt-2">
          {{ content }}
        </p>
        <div class="flex justify-center">
          <RouterLink
            to="/"
            class="text-black text-base font-medium !mt-7 block !mb-4 hover:opacity-75"
            >Trở về trang chủ</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import deviceMixin from '@/utils/deviceMixin'

export default {
  name: 'NotFound',
  mixins: [deviceMixin],
  props: {
    title: {
      type: String,
      default: 'Không tìm thấy trang',
    },
    content: {
      type: String,
      default: 'Xin lỗi, chúng tôi không tìm thấy trang này',
    },
    minHeight: {
      type: String,
      default: 'h-[80vh]',
    },
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)

    onMounted(() => {
      document.title = 'Không tìm thấy trang - tsunsg'
    })

    return {
      isMobile,
      isDesktop,
    }
  },
}
</script>
