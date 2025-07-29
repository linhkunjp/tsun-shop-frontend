<template>
  <div class="bg-white text-center flex flex-col !mb-16">
    <!-- Title -->
    <div class="text-black !mb-8">
      <span
        :class="isMobile ? 'text-[28px]' : 'text-2xl'"
        class="text-2xl uppercase !font-bold block"
        >{{ text }}</span
      >
      <slot></slot>
    </div>

    <!-- Slide -->
    <div :class="{ 'min-h-[400px]': collectionStore.isLoading }" class="relative">
      <LoadingComp v-if="collectionStore.isLoading" />
      <Swiper
        v-if="slides.length > 0"
        :modules="[Pagination, Navigation, Autoplay]"
        :slides-per-view="1"
        :spaceBetween="20"
        :speed="2000"
        :autoplay="{ delay: 3500 }"
        :loop="true"
        :pagination="{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class='${className} !opacity-100 !w-[25px] bg-white !h-[25px] !border border-tsun-blue !cursor-pointer bg-white text-tsun-blue !rounded-none !text-[12px] !mt-9'>${index + 1}</span>`
          },
        }"
        class="h-full w-full select-none"
      >
        <SwiperSlide v-for="(slide, index) in groupedSlides" :key="index">
          <div class="grid gap-x-5 gap-y-9 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div v-for="(item, i) in slide" :key="i" class="">
              <div
                :class="{ 'product-img': isDesktop }"
                class="cursor-pointer overflow-hidden block relative hover-img"
              >
                <RouterLink :to="`/products/${item.slug}`" @click="getTitle(item.title)">
                  <div v-if="item.pro_sale" class="absolute top-[10px] left-[10px] bg-white z-99">
                    <p class="text-xs font-bold text-[#F94C43] px-2 py-1">{{ item.pro_sale }}</p>
                  </div>
                  <div class="image">
                    <template v-for="(img, i) in duplicatedImages(item.images)" :key="i">
                      <img :src="img" class="aspect-3/4 w-full block object-cover" />
                    </template>
                  </div>
                </RouterLink>
                <div
                  @click="openModal(true, item.slug)"
                  class="view_product absolute inset-0 w-[45px] h-[45px] leading-[43px] p-0 !m-auto z-9 rounded-full bg-white text-black text-base"
                ></div>
              </div>

              <div class="!font-medium !mt-5">
                <div class="product-title">
                  <a class="!text-sm !text-black !mb-1 overflow-hidden cursor-pointer">{{
                    item.title
                  }}</a>
                </div>
                <div class="cursor-default">
                  <p v-if="item.pro_sale" class="!text-sm text-[#F94C43] !mr-2 float-left">
                    {{ item.pro_price }}
                  </p>
                  <p
                    :class="
                      item.pro_sale
                        ? '!text-[13px] text-[#939393] line-through'
                        : '!text-sm text-black'
                    "
                    class="float-left"
                  >
                    {{ item.regular_price }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <div class="custom-pagination md:!hidden mt-10"></div>
      </Swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import deviceMixin from '@/utils/deviceMixin'

import { useModalStore } from '@/stores/modal'
import { useCollectionStore } from '@/stores/collection'
import { useProductStore } from '@/stores/product'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import LoadingComp from '@/components/ui/LoadingComp.vue'

export default {
  name: 'GridSlide',
  mixins: [deviceMixin],
  components: {
    Swiper,
    SwiperSlide,
    LoadingComp,
  },
  props: {
    text: String,
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const currentColumns = ref(4)

    const modalStore = useModalStore()
    const productStore = useProductStore()
    const collectionStore = useCollectionStore()

    const slides = computed(() => collectionStore.dataProducts)

    async function openModal(value: boolean, slug: string) {
      await productStore.getProductDetail(slug)
      modalStore.openModal(value)
    }

    // Responsive column
    const updateColumns = () => {
      const w = window.innerWidth
      if (w <= 768) currentColumns.value = 2
      else if (w < 1024) currentColumns.value = 3
      else currentColumns.value = 4
    }

    // Số sản phẩm trên 1 trang
    const groupedSlides = computed(() => {
      const rows = 2
      const itemsPerPage = currentColumns.value * rows
      const groups = []
      for (let i = 0; i < slides.value.length; i += itemsPerPage) {
        groups.push(slides.value.slice(i, i + itemsPerPage))
      }
      return groups
    })

    // Hover khi chỉ có 1 ảnh
    function duplicatedImages(images: string[]) {
      return images.length === 1 ? [images[0], images[0]] : images.slice(0, 2)
    }

    function getTitle(title: string) {
      document.title = title + ' - tsunsg'
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
      slides,
      Autoplay,
      Pagination,
      Navigation,
      updateColumns,
      groupedSlides,
      modalStore,
      collectionStore,
      openModal,
      duplicatedImages,
      getTitle,
    }
  },
}
</script>

<style>
.swiper-pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.swiper-pagination-bullet-active {
  background-color: var(--blue-color) !important;
  color: white;
}

.swiper-pagination-bullet {
  background-color: #fff;
}

.view_product:before {
  font-family: 'FontAwesome' !important;
  font: normal normal normal 22px / 2 FontAwesome;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\f00e';
}

.view_product {
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

.product-img:hover .view_product {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
}

.product-img.hover-img div.image img {
  -webkit-transition: all 0.5s ease 0s;
  transition: all 0.5s ease 0s;
}

.hover-img div.image img:nth-of-type(2) {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  inset: 0;
}

.product-img.hover-img:hover div.image img:nth-of-type(1) {
  opacity: 0;
  visibility: hidden;
}

.product-img.hover-img:hover div.image img:nth-of-type(2) {
  opacity: 1;
  visibility: visible;
}

.view_product:hover {
  background: black;
  color: white;
}

.product-title a {
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-align: left;
}
</style>
