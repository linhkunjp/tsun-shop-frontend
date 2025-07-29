<template>
  <div>
    <BreadCrumb :dataBreadcrumb="dataBreadcrumb" />

    <div class="container text-left text-black text-sm !mb-10">
      <p class="text-[30px] font-bold !my-10">Liên hệ</p>

      <div>
        <p><strong>Hotline 1:</strong> 0934 076 342</p>
        <p><strong>Hotline 2:</strong> 0344 862 658</p>
        <p><strong>Facebook:</strong> https://www.facebook.com/TSUN.SG</p>
        <p><strong>Instagram:</strong> https://www.instagram.com/tsun.sg/</p>
        <p><strong>Mail:</strong> <span class="underline">tsunsg@gmail.com</span></p>
        <p class="!my-3 font-bold">-----HỆ THỐNG CỬA HÀNG-----</p>
        <p><strong>• FLAGSHIP STORE:</strong> 26 Trần Quang Diệu, phường 14, quận 3</p>
        <p><strong>• G-TOWN:</strong> 350 Điện Biên Phủ, phường 17, quận Bình Thạnh</p>
        <p><strong>• G-TOWN 2:</strong> 136 Nguyễn Hồng Đào, phường 13, quận Tân Bình</p>
        <p><strong>• Đồng Nai:</strong> 47 Dương Tử Giang, phường Tân Tiến, TP. Biên Hoà</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import BreadCrumb from '@/components/ui/BreadCrumb.vue'

export default {
  name: 'ContactPage',
  mixins: [deviceMixin],
  components: {
    BreadCrumb,
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)

    const dataBreadcrumb = ['Liên hệ']

    return {
      isMobile,
      isDesktop,
      dataBreadcrumb,
    }
  },
}
</script>
