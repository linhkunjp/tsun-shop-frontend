<template>
  <!-- Sidebar -->
  <div
    :class="[
      {
        'tsun-transform-0': sidebarStore.isOpen,
      },
      !isMobile ? 'px-17 pt-10 pb-30  w-[480px]' : 'px-7 pt-5 pb-14  w-[320px]',
    ]"
    class="bg-white fixed right-0 top-0 bottom-0 tsun-transform-100 z-999 flex flex-col overflow-auto"
  >
    <!-- Close sidebar -->
    <div class="flex items-center justify-between !mb-10">
      <span class="text-black !text-sm uppercase !font-medium">{{ sidebarStore.getLabel }}</span>
      <button class="cursor-pointer p-2 !pr-1 group" @click="openSidebar(false, '')">
        <i
          class="fa-solid fa-xmark text-[32px] transition-transform duration-300 ease-in-out group-hover:scale-125 text-black font-medium"
        ></i>
      </button>
    </div>

    <!-- Content -->
    <SidebarMenu v-if="sidebarStore.component == 'menu'" />
    <SidebarCart v-if="sidebarStore.component == 'cart'" />

    <div v-if="sidebarStore.component == 'menu'" class="h-full">
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
    </div>

    <div v-if="sidebarStore.component == 'menu'" class="text-grey text-xs opacity-[.66] !mt-auto">
      <p>Copyright © 2025 tsunsg</p>
      <p>Powered by Haravan</p>
    </div>
  </div>

  <!-- Overlay -->
  <div
    @click="openSidebar(false, '')"
    :class="{ 'visible opacity-100': sidebarStore.isOpen }"
    class="overlay-sidebar fixed inset-0 invisible opacity-0 z-888"
  ></div>
</template>
<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import SidebarMenu from '@/components/ui/sidebar/SidebarMenu.vue'
import SidebarCart from '@/components/ui/sidebar/SidebarCart.vue'

export default {
  name: 'SidebarComp',
  mixins: [deviceMixin],
  components: {
    SidebarMenu,
    SidebarCart,
  },

  setup() {
    const isMobile = ref(false)
    const sidebarStore = useSidebarStore()
    const authStore = useAuthStore()
    const router = useRouter()

    function openSidebar(v: boolean, c: string) {
      sidebarStore.openSidebar(v, c)
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

    return {
      isMobile,
      sidebarStore,
      openSidebar,
      handleLogin,
      authStore,
    }
  },
}
</script>
