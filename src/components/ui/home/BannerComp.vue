<template>
  <div
    :style="{
      top: isMobile ? '0' : '-50px',
      marginTop: isMobile ? '15px' : '0',
      marginBottom: isMobile ? '30px' : '0',
      transition: 'top 3s ease, margin 3s ease',
      boxShadow: '0 0 0 20px #fff',
    }"
    class="text-black bg-white relative flex justify-center select-none"
  >
    <div class="!mx-[-15px]">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="float-left w-[calc(100%/3)] px-[15px] banner"
      >
        <RouterLink
          :to="`/collections/${item.slug}`"
          target="_blank"
          class="overflow-hidden block relative"
        >
          <img :src="item.image" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'

import banner1 from '@/assets/img/banner/banner1.jpg'
import banner2 from '@/assets/img/banner/banner2.jpg'
import banner3 from '@/assets/img/banner/banner3.jpg'

export default {
  name: 'BannerComp',
  mixins: [deviceMixin],

  setup() {
    const isMobile = ref(false)
    const data = [
      {
        slug: 'ao-thun-t',
        image: banner1,
      },
      {
        slug: 'jacket-tsun',
        image: banner2,
      },
      {
        slug: 'pants',
        image: banner3,
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
.banner a:before {
  border: 1px solid #ffffff;
  bottom: 20px;
  content: '';
  left: 20px;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transform: scale(1.4);
  -ms-transform: scale(1.4);
  -o-transform: scale(1.4);
  transform: scale(1.4);
  position: absolute;
  right: 20px;
  top: 20px;
  -webkit-transition:
    opacity 0.35s ease 0s,
    transform 0.35s ease 0s;
  -o-transition:
    opacity 0.35s ease 0s,
    transform 0.35s ease 0s;
  transition:
    opacity 0.35s ease 0s,
    transform 0.35s ease 0s;
  -webkit-box-shadow: 0 0 0 20px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.banner a:hover:before,
.banner a:hover:after {
  opacity: 1;
  filter: alpha(opacity=100);
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
}
</style>
