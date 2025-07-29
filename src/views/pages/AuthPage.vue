<template>
  <div>
    <div
      :class="{ '!max-w-[750px]': isTablet, '!max-w-[500px]': isDesktop }"
      class="container !my-12 !py-10 flex justify-center flex-col"
    >
      <!-- Title -->
      <div
        class="text-center after:content-[''] after:block after:bg-[#252a2b] after:w-[60px] after:h-[4px] after:!my-[12px] after:!ml-auto after:!mr-auto"
      >
        <h1 :class="isDesktop ? 'text-[45px]' : 'text-[34px]'" class="text-black font-bold">
          {{ authStore.title }}
        </h1>
      </div>

      <AuthLogin v-if="authStore.component == 'login'" />
      <AuthRegister v-if="authStore.component == 'register'" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import { useAuthStore } from '@/stores/auth'
import AuthLogin from '@/components/ui/auth/AuthLogin.vue'
import AuthRegister from '@/components/ui/auth/AuthRegister.vue'

export default {
  name: 'AuthPage',
  mixins: [deviceMixin],
  components: { AuthLogin, AuthRegister },

  setup() {
    const isMobile = ref(false)
    const isTablet = ref(false)
    const isDesktop = ref(false)

    const authStore = useAuthStore()

    return {
      isMobile,
      isTablet,
      isDesktop,
      authStore,
    }
  },
}
</script>
