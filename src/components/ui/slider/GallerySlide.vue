<template>
  <div>
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
      }"
      :spaceBetween="10"
      :navigation="false"
      :thumbs="{ swiper: thumbsSwiper }"
      :modules="modules"
    >
      <template v-for="(i, index) in data" :key="index">
        <swiper-slide><img :src="i" class="aspect-3/4 block object-cover" /></swiper-slide>
      </template>
    </swiper>
    <swiper
      @swiper="setThumbsSwiper"
      :spaceBetween="10"
      :slidesPerView="4"
      :freeMode="false"
      :watchSlidesProgress="true"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :modules="modules"
      class="relative !mt-3"
    >
      <template v-for="(i, index) in data" :key="index">
        <swiper-slide class="border border-transparent"
          ><img :src="i" class="aspect-3/4 block object-cover"
        /></swiper-slide>
      </template>

      <div class="swiper-button-prev custom-nav">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <div class="swiper-button-next custom-nav">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </swiper>
  </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'

import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

export default {
  name: 'GallerySlide',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    dataImages: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
  },

  setup(props) {
    const thumbsSwiper = ref(null)

    const data = computed(() => props.dataImages || [])

    const setThumbsSwiper = (swiper: any) => {
      thumbsSwiper.value = swiper
    }

    return {
      thumbsSwiper,
      setThumbsSwiper,
      data,
      modules: [FreeMode, Navigation, Thumbs],
    }
  },
}
</script>

<style scoped>
img {
  width: 100%;
}

.custom-nav {
  color: white;
  top: 50%;
  background-color: #00000033;
  font-size: 18px;
  padding: 8px 6px;
  position: absolute;
  height: fit-content;
  width: fit-content;
}

.custom-nav i {
  font-weight: 100 !important;
}

.swiper-button-disabled {
  display: none;
}

.swiper-button-prev.custom-nav {
  left: 0;
}

.swiper-button-next.custom-nav {
  right: 0;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  content: '';
}

.swiper-slide-thumb-active {
  border-color: #000;
}
</style>
