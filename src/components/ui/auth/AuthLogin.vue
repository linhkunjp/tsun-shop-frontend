<template>
  <div class="!mt-5">
    <h2 v-if="!isLogin" class="text-black text-[20px] font-bold !mb-4">Phục hồi mật khẩu</h2>
    <Form @submit="handleSubmit" :validation-schema="SignInSchema">
      <AuthInput v-model="formData.email" :placeholder="'Email'" :isRequired="true" name="email" />
      <AuthInput
        v-if="isLogin"
        v-model="formData.password"
        :placeholder="'Mật khẩu'"
        :type="'password'"
        :isRequired="true"
        name="password"
      />

      <div class="text-[13px] text-[#9e9e9e]">
        This site is protected by reCAPTCHA and the Google
        <span class="text-[#2962ff]">Privacy Policy</span> and
        <span class="text-[#2962ff]">Terms of Service</span> apply.
      </div>

      <div class="!mt-[30px] flex items-center gap-5">
        <ButtonComp
          type="submit"
          :text="isLogin ? 'Đăng nhập' : 'Gửi'"
          :isBlue="true"
          class="font-semibold !px-7 !py-4"
        />
        <div class="text-[#9e9e9e] text-sm font-medium">
          <template v-if="isLogin">
            <p @click="isLogin = false" class="text-[#080808] cursor-pointer">Quên mật khẩu?</p>
            <p>
              hoặc <span @click="handleAuth" class="text-[#080808] cursor-pointer">Đăng ký</span>
            </p>
          </template>

          <template v-else>
            <p @click="isLogin = true" class="text-[#080808] cursor-pointer">Hủy</p>
          </template>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, onMounted } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import AuthInput from '@/components/ui/auth/AuthInput.vue'
import ButtonComp from '@/components/ui/ButtonComp.vue'

import { Form } from 'vee-validate'
import { SignInSchema } from '@/schemas/SignInSchema'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'AuthLogin',
  mixins: [deviceMixin],
  components: { AuthInput, ButtonComp, Form },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const isLogin = ref(true)

    const toast = useToast()
    const router = useRouter()
    const authStore = useAuthStore()
    const guestId = ref(localStorage.getItem('guest_id') || '')

    const formData = reactive({
      email: '',
      password: '',
      username: '',
      guestId: guestId.value,
    })

    function handleAuth() {
      authStore.handleAuth('register', 'Tạo tài khoản')
    }

    async function handleSubmit() {
      // console.log('submitData: ', { ...formData })
      const submitData = isLogin.value ? { ...formData } : { email: formData.email }
      const response = await authStore.handleLogin(
        submitData as { email: string; password: string },
      )
      if (response.isSuccess == false) {
        toast.add({
          severity: 'error',
          summary: response.message,
          group: 'tl',
          life: 3000,
        })
      } else {
        authStore.userId = response.user_id
        authStore.token = response.token
        toast.add({
          severity: 'success',
          summary: response.message,
          group: 'tl',
          life: 1500,
        })
        // router.push({ path: '/' })
        window.location.href = '/'
      }
    }

    onMounted(() => {
      document.title = 'Đăng nhập'
    })

    return {
      isMobile,
      isDesktop,
      authStore,
      isLogin,
      formData,
      handleAuth,
      handleSubmit,
      SignInSchema,
    }
  },
})
</script>
