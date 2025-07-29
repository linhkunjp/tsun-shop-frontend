<template>
  <div class="!mb-16 select-none">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div v-for="(item, index) in data" :key="index" class="infor">
        <RouterLink :to="`/collections/${item.slug}`" class="relative block overflow-hidden infor">
          <img :src="item.image" />
          <div class="absolute bottom-5 left-5 px-4 py-3 bg-white !font-bold">
            <span class="block text-[#666666] text-base">{{ item.category }}</span>
            <p class="text-sm text-black">{{ item.count }} sản phẩm</p>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'

import imgTop from '@/assets/img/infor/imgTop.jpg'
import imgOuter from '@/assets/img/infor/imgOuter.jpg'
import imgBot from '@/assets/img/infor/imgBot.jpg'
import imgAcc from '@/assets/img/infor/imgAcc.jpg'

export default {
  name: 'InforComp',
  mixins: [deviceMixin],

  setup() {
    const isMobile = ref(false)
    const data = [
      {
        category: 'Tops',
        count: 104,
        slug: 'ao-thun-t',
        image: imgTop,
      },
      {
        category: 'Outerwear',
        count: 13,
        slug: 'jacket-tsun',
        image: imgOuter,
      },
      {
        category: 'Bottoms',
        count: 20,
        slug: 'pants',
        image: imgBot,
      },
      {
        category: 'Accessories',
        count: 7,
        slug: 'accessories',
        image: imgAcc,
      },
    ]

    return {
      isMobile,
      data,
    }
  },
}
</script>

<style scoped>
.infor a:before,
.infor a:after {
  bottom: 0;
  content: '';
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: all 900ms ease 0s;
}

.infor a:hover:before {
  background: rgba(255, 255, 255, 0.5) none repeat scroll 0 0;
  bottom: 50%;
  top: 50%;
}

.infor a:hover:after {
  background: rgba(255, 255, 255, 0.5) none repeat scroll 0 0;
  left: 51%;
  right: 50%;
}
</style>
