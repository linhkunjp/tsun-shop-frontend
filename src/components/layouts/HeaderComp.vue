<template>
  <div>
    <!-- Top -->
    <div class="w-full bg-main">
      <div class="container flex justify-between items-center py-[9px]">
        <span v-if="isDesktop" class="text-black" :class="{ 'text-[13px]': !isMobile }">
          tsunsg@gmail.com | Hotline: 093 407 6342
        </span>

        <span class="text-black" :class="!isDesktop ? 'text-xs text-center w-full' : 'text-[13px]'">
          Các đơn hàng từ 400k sẽ được vận chuyển bằng TSUN BOX
        </span>

        <SearchComp v-if="isDesktop" :text="'Tìm kiếm...'" class="w-[282px]" />
      </div>
    </div>

    <!-- Main -->
    <div
      :class="[{ 'py-[10px]': !isDesktop }, headerClass]"
      class="w-full shadow-xs !mb-[2px] bg-white z-99"
    >
      <MainHeader />
    </div>

    <!-- Footer -->
    <div>
      <SearchComp
        v-if="!isDesktop"
        :text="'Tìm kiếm sản phẩm'"
        class="!bg-[#f5f5f5] !rounded-none justify-between !mx-1.5 !my-2"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import SearchComp from '../ui/SearchComp.vue'
import MainHeader from '../ui/header/MainHeader.vue'

export default {
  name: 'HeaderComp',
  mixins: [deviceMixin],
  components: {
    SearchComp,
    MainHeader,
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const headerClass = ref('')

    const onScroll = () => {
      const current = window.scrollY

      if (current < 100) {
        headerClass.value = ''
      } else {
        headerClass.value = 'scroll fixed top-0 left-0 right-0'
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', onScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll)
    })

    return {
      isMobile,
      isDesktop,
      headerClass,
    }
  },
}
</script>

<style scoped>
.scroll {
  -webkit-animation: fadeInDown 500ms ease-in-out;
  -moz-animation: fadeInDown 500ms ease-in-out;
  -ms-animation: fadeInDown 500ms ease-in-out;
  animation: fadeInDown 500ms ease-in-out;
  -webkit-transition: all 500ms linear;
  -moz-transition: all 500ms linear;
  -ms-transition: all 500ms linear;
  -o-transition: all 500ms linear;
  transition: all 500ms linear;
  box-shadow: 0 2px 10px #ccc;
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}
</style>
