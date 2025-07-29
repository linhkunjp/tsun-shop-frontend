<template>
  <div v-if="modalStore.isOpen">
    <!-- Modal -->
    <div
      :class="[
        isDesktop ? 'top-[10%]' : 'top-[5%] bottom-[5%]',
        isDesktop ? 'w-[980px]' : isTablet ? 'w-[600px]' : 'w-[90%]',
      ]"
      class="bg-white fixed left-0 right-0 !mx-auto z-100 overflow-y-auto"
    >
      <div
        :class="isDesktop ? 'text-[28px] px-3 py-2' : 'text-[24px] px-2 pt-1 pb-2'"
        @click="openModal(false)"
        class="text-black absolute top-0 right-0 flex hover:bg-[#333e48] hover:text-white cursor-pointer transition-[opacity,color,background] duration-150 ease-linear"
      >
        <i class="fa-solid fa-xmark"></i>
      </div>
      <div
        :class="[
          isDesktop ? 'grid' : 'flex flex-col',
          isDesktop || isTablet ? 'gap-8 p-10 pb-12' : 'gap-4 p-4 pt-10',
        ]"
        class="grid-cols-3"
      >
        <GallerySlide :dataImages="productStore.dataProduct.images" class="col-span-1" />
        <ProdDetail :dataDetail="productStore.dataProduct" class="col-span-2" :isBtnDetail="true" />
      </div>
    </div>

    <!-- Overlay -->
    <div
      @click="openModal(false)"
      class="overlay-modal fixed inset-0 z-99 visible opacity-100"
    ></div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue'
import { useModalStore } from '@/stores/modal'
import { useProductStore } from '@/stores/product'

import deviceMixin from '@/utils/deviceMixin'
import GallerySlide from '@/components/ui/slider/GallerySlide.vue'
import ProdDetail from '@/components/ui/product/ProdDetail.vue'

export default {
  name: 'ModalComp',
  mixins: [deviceMixin],
  components: { GallerySlide, ProdDetail },

  setup() {
    const isTablet = ref(false)
    const isDesktop = ref(false)
    const modalStore = useModalStore()
    const productStore = useProductStore()

    function openModal(v: boolean) {
      modalStore.openModal(v)
    }

    return {
      isTablet,
      isDesktop,
      modalStore,
      productStore,
      openModal,
    }
  },
}
</script>
