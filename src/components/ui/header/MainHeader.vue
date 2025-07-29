<template>
  <div class="bg-white container flex justify-between items-center">
    <!-- Show menu mobile -->
    <button
      @click="openSidebar(true, 'menu')"
      v-if="!isDesktop"
      :class="{ 'w-[calc(100%/3)] text-left': isTablet, '!mr-8': isMobile }"
      class="px-[15px] cursor-pointer leading-none"
    >
      <i class="fa fa-bars !text-[20px] text-black"></i>
    </button>

    <!-- Logo -->
    <div :class="{ 'w-[25%]': !isTablet }">
      <RouterLink to="/" class="flex justify-center"
        ><img
          :class="{ 'max-w-[160px]': isMobile }"
          class="block select-none"
          src="@/assets/img/logo.jpg"
      /></RouterLink>
    </div>

    <!-- Menu -->
    <div v-if="isDesktop" class="text-black w-full">
      <ul class="text-center w-full">
        <li
          v-for="(item, index) in json"
          :key="index"
          class="inline-block text-[10px] !mr-[10px] leading-none relative"
          @mouseenter="openMenu(index, true)"
          @mouseleave="openMenu(index, false)"
        >
          <!-- Main -->
          <div class="flex items-center justify-between w-full !font-bold uppercase">
            <RouterLink
              :to="`/collections/${item.slug}`"
              @click="setTitle(item.title)"
              class="w-full py-[35px]"
              ><span class="!font-bold text-[13px] !mr-1">{{ item.label }}</span></RouterLink
            >
            <span
              v-if="item.children && item.children.length > 0"
              class="inline-block cursor-pointer text-center"
              ><i
                :class="{ 'rotate-180': isOpenMenu[index] }"
                class="fa fa-angle-down tsun-transition-arrow !text-[12px]"
              ></i
            ></span>
          </div>

          <!-- Children -->
          <Transition
            enter-active-class="transition-[max-height] duration-500 ease-in-out"
            enter-from-class="max-h-0"
            enter-to-class="max-h-50"
            leave-active-class="transition-[max-height] duration-500 ease-in-out"
            leave-from-class="max-h-96"
            leave-to-class="max-h-0"
          >
            <ul
              v-show="isOpenMenu[index]"
              class="text-black !text-base !ml-1 overflow-hidden absolute bg-white top-[84px] left-0 w-max border-t-1 border-black z-9"
            >
              <li
                v-for="(child, index) in item.children"
                :key="index"
                class="py-2 leading-none flex items-center justify-between w-full px-4 cursor-pointer border-b-1 border-[#e2e6e7] group"
              >
                <RouterLink
                  :to="`/collections/${child.slug}`"
                  @click="setTitle(child.title)"
                  class="p-2"
                >
                  <span
                    class="!text-md !font-normal !capitalize inline-block group-hover:scale-105"
                    >{{ child.label }}</span
                  ></RouterLink
                >
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </div>

    <!-- Login/ Cart -->
    <div :class="{ 'w-[25%]': !isMobile, 'w-[calc(100%/3)]': isTablet }" class="flex justify-end">
      <div class="flex items-center gap-x-4 px-[15px] w-max">
        <!-- Btn login -->
        <button
          @click="handleLogin()"
          class="text-xs text-black flex items-center border-none leading-1"
        >
          <i v-if="authStore.token" class="fa-solid fa-right-to-bracket text-[18px]"></i>
          <i v-else class="fa-regular fa-circle-user text-[20px]"></i>

          <span v-if="!isMobile" class="!ml-[8px]">{{
            authStore.token ? 'Đăng xuất' : 'Đăng nhập'
          }}</span>
        </button>

        <!-- cart -->
        <button
          @click="openSidebar(true, 'cart')"
          class="relative border-none flex items-center p-1"
        >
          <i class="fa-solid fa-cart-shopping text-black text-[20px]"></i>
          <span
            class="tsun-icon-cart absolute bg-tsun-blue w-4 h-4 !text-white rounded-full text-[10px] top-[-5px] right-[-6px]"
            >{{ cartStore.cartQuantity }}</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import { useSidebarStore } from '@/stores/sidebar'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import json from '@/utils/json.json'

export default {
  name: 'MainHeader',
  mixins: [deviceMixin],

  setup() {
    const isMobile = ref(false)
    const isTablet = ref(false)
    const isDesktop = ref(false)

    const sidebarStore = useSidebarStore()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const isOpenMenu = ref<boolean[]>(new Array(json.length).fill(false))

    function openSidebar(v: boolean, c: string) {
      sidebarStore.openSidebar(v, c)
    }

    function openMenu(index: number, status: boolean) {
      isOpenMenu.value[index] = status
    }

    function handleLogin() {
      if (!authStore.token) {
        router.push('/auth')
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('email')
        localStorage.removeItem('username')
        window.location.href = '/'
      }
    }

    function setTitle(title: string) {
      document.title = title + ' - tsunsg'
    }

    return {
      isMobile,
      isTablet,
      isDesktop,
      isOpenMenu,
      sidebarStore,
      openSidebar,
      openMenu,
      json,
      cartStore,
      handleLogin,
      setTitle,
      authStore,
    }
  },
}
</script>
