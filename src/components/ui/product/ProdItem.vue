<template>
  <div>
    <div
      :class="{ 'product-img': isDesktop }"
      class="cursor-pointer overflow-hidden block relative hover-img"
    >
      <RouterLink :to="`/products/${item.slug}`" @click="getTitle(item.title)">
        <div v-if="item.pro_sale" class="absolute top-[10px] left-[10px] bg-white z-9">
          <p class="text-xs font-bold text-[#F94C43] px-2 py-1">{{ item.pro_sale }}</p>
        </div>
        <div class="image">
          <template v-for="(item, i) in duplicatedImages" :key="i">
            <img :src="item" class="aspect-3/4 w-full block object-cover" loading="lazy" />
          </template>
        </div>
      </RouterLink>
      <div
        @click="openModal(true)"
        class="view_product z-99 absolute inset-0 w-[45px] h-[45px] leading-[43px] p-0 !m-auto z-9 rounded-full bg-white text-black text-base text-center"
      ></div>
    </div>

    <div class="!font-medium !mt-5 !select-none">
      <div class="product-title">
        <RouterLink
          :to="`/products/${item.slug}`"
          class="!text-sm !text-black !mb-1 overflow-hidden cursor-pointer"
          >{{ item.title }}</RouterLink
        >
      </div>
      <div class="cursor-default">
        <p v-if="item.pro_sale" class="!text-sm text-[#F94C43] !mr-2 float-left">
          {{ item.pro_price }}
        </p>
        <p
          :class="
            item.pro_sale ? '!text-[13px] text-[#939393] line-through' : '!text-sm text-black'
          "
          class="float-left"
        >
          {{ item.regular_price }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import type { PropType } from 'vue'
import type { ProductItem } from '@/types/product'

import { useModalStore } from '@/stores/modal'
import { useProductStore } from '@/stores/product'

export default {
  name: 'ProdItem',
  mixins: [deviceMixin],
  props: {
    item: {
      type: Object as PropType<ProductItem>,
      required: true,
    },
    index: Number,
  },

  setup(props) {
    const isMobile = ref(false)
    const isDesktop = ref(false)

    const modalStore = useModalStore()
    const productStore = useProductStore()

    async function openModal(v: boolean) {
      await productStore.getProductDetail(props.item.slug)
      modalStore.openModal(v)
    }

    function getTitle(title: string) {
      document.title = title + ' - tsunsg'
    }

    // Hover khi chỉ có 1 ảnh
    const duplicatedImages = computed(() => {
      const imgs = props.item.images
      return imgs.length === 1 ? [imgs[0], imgs[0]] : imgs.slice(0, 2)
    })

    return {
      isMobile,
      isDesktop,
      openModal,
      getTitle,
      duplicatedImages,
    }
  },
}
</script>

<style scoped>
.view_product {
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

.view_product:before {
  font-family: 'FontAwesome' !important;
  font: normal normal normal 22px / 2 FontAwesome;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: '\f00e';
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
