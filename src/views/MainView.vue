<template>
  <div
    :class="{ 'right-[320px] ': sidebarStore.isOpen }"
    class="relative right-0 tsun-transition flex flex-col h-full"
  >
    <HeaderComp />
    <router-view class="h-full" />
    <FooterComp />
  </div>

  <SidebarComp />
  <ModalComp />
  <ToolbarMobile />
  <div>
    <Toast position="top-center" group="tl" />
  </div>
  <LoadingComp v-if="authStore.isLoading" :bgColor="'#00000066'" />
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

import HeaderComp from '@/components/layouts/HeaderComp.vue'
import FooterComp from '@/components/layouts/FooterComp.vue'
import SidebarComp from '@/components/layouts/SidebarComp.vue'
import ModalComp from '@/components/layouts/ModalComp.vue'
import LoadingComp from '@/components/ui/LoadingComp.vue'
import ToolbarMobile from '@/components/ui/toolbar/ToolbarMobile.vue'
import Toast from 'primevue/toast'

export default {
  name: 'MainView',
  components: {
    HeaderComp,
    FooterComp,
    SidebarComp,
    ModalComp,
    Toast,
    LoadingComp,
    ToolbarMobile,
  },

  setup() {
    const sidebarStore = useSidebarStore()
    const cartStore = useCartStore()
    const authStore = useAuthStore()

    onMounted(async () => {
      await cartStore.getCart()
    })

    return {
      sidebarStore,
      authStore,
    }
  },
}
</script>

<style>
.p-toast-message {
  min-width: 500px;
  min-height: 40px;
}

.p-toast-message-content {
  padding: 20px !important;
  align-items: center !important;
}

.p-toast-summary {
  margin-left: 10px !important;
  font-size: 18px !important;
}

.p-toast-close-button {
  margin: 0;
  right: 0;
}
</style>
