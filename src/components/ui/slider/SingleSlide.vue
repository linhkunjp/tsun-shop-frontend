<template>
  <p
    v-if="data && data.length > 0"
    class="text-black text-[28px] font-medium uppercase !mb-14 !mt-8 text-center"
  >
    Sản phẩm liên quan
  </p>
  <Swiper
    :spaceBetween="10"
    :slidesPerView="isDesktop ? 5 : isMobile ? 2 : 4"
    :freeMode="false"
    :watchSlidesProgress="true"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    :modules="modules"
    class="relative swiper-product !mt-3"
  >
    <SwiperSlide v-for="(item, index) in data" :key="index">
      <ProdItem :index="index" :item="item" />
    </SwiperSlide>

    <button class="swiper-button-prev custom-nav">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button class="swiper-button-next custom-nav">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </Swiper>
</template>
<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { PropType } from 'vue'
import type { ProductItem } from '@/types/product'
import { useModalStore } from '@/stores/modal'
import ProdItem from '@/components/ui/product/ProdItem.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { Navigation } from 'swiper/modules'

export default {
  name: 'SingleSlide',
  components: {
    Swiper,
    SwiperSlide,
    ProdItem,
  },
  props: {
    data: {
      type: Array as PropType<ProductItem[]>,
      required: true,
    },
  },

  setup(props) {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const modalStore = useModalStore()
    const data = computed(() => props.data)

    function openModal(v: boolean) {
      modalStore.openModal(v)
    }

    // Responsive column
    const updateColumns = () => {
      const width = window.innerWidth
      isMobile.value = width < 768
      isDesktop.value = width >= 1024
    }

    onMounted(() => {
      updateColumns()
      window.addEventListener('resize', updateColumns)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateColumns)
    })

    return {
      isMobile,
      isDesktop,
      data,
      modules: [Navigation],
      updateColumns,
      modalStore,
      openModal,
    }
  },
}
</script>

<style scoped>
img {
  width: 100%;
}

.swiper-product:hover > button.custom-nav {
  opacity: 1;
  visibility: visible;
}

.swiper-product:hover > .swiper-button-prev.custom-nav {
  left: 10px;
}

.swiper-product:hover > .swiper-button-next.custom-nav {
  right: 10px;
}

button.custom-nav {
  color: black;
  top: 50%;
  background-color: #fff;
  font-size: 20px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  position: absolute;
  border: none;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: all 0.35s ease;
  -o-transition: all 0.35s ease;
  transition: all 0.35s ease;
  opacity: 0;
  visibility: hidden;
}

button.custom-nav:hover {
  color: #fff;
  background-color: #000;
}

button.custom-nav i {
  font-weight: 100 !important;
}

.swiper-button-disabled {
  display: none;
}

.swiper-button-prev.custom-nav {
  padding-right: 4px;
  left: 30px;
}

.swiper-button-next.custom-nav {
  padding-left: 4px;
  right: 30px;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  content: '';
}

.swiper-slide-thumb-active {
  border-color: #000;
}
</style>
