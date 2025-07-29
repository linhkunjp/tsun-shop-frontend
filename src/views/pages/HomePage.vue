<template>
  <!-- Background -->
  <div class="w-full select-none">
    <img class="w-full" src="@/assets/img/bg.jpg" />
  </div>

  <!-- Main -->
  <div
    :style="{
      transition: 'max-width 2s ease',
    }"
    class="h-full container"
  >
    <!-- Banner -->
    <BannerComp />

    <!-- Slide new product -->
    <GridSlide :text="'sản phẩm mới'" :sort="'created_asc'" />

    <!-- Infor -->
    <InforComp />

    <!-- Slide best seller -->
    <GridSlide :text="'best seller tsun'" :sort="'price_desc'">
      <p class="!text-sm">Sản phẩm hot gợi ý bạn phải mua</p>
    </GridSlide>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import GridSlide from '@/components/ui/slider/GridSlide.vue'
import InforComp from '@/components/ui/home/InforComp.vue'
import BannerComp from '@/components/ui/home/BannerComp.vue'
import { useCollectionStore } from '@/stores/collection'

export default {
  name: 'HomePage',
  mixins: [deviceMixin],
  components: {
    GridSlide,
    InforComp,
    BannerComp,
  },

  setup() {
    const isMobile = ref(false)
    const collectionStore = useCollectionStore()

    onMounted(async () => {
      document.title = 'TSUN™ Official | Localbrand Streetwear Cho Giới Trẻ – tsunsg'
      await collectionStore.getProductList('', 1, '')
    })

    return {
      isMobile,
    }
  },
}
</script>
