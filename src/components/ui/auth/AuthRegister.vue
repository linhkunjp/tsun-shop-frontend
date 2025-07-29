<template>
  <div class="!mt-5">
    <Form @submit="handleSubmit" :validation-schema="SignUpSchema">
      <AuthInput v-model="formData.firstName" :placeholder="'Họ'" name="firstName" />
      <AuthInput
        v-model="formData.username"
        :placeholder="'Tên'"
        name="lastName"
        :isRequired="true"
      />
      <div class="flex items-center gap-4 !mb-[30px]">
        <div v-for="(item, index) in dataGender" :key="index" class="flex items-center">
          <input
            type="radio"
            v-model="formData.gender"
            :id="item.value"
            :value="item.value"
            class="cursor-pointer"
          />
          <label :for="item.value" class="text-sm text-black font-bold !pl-1.5 cursor-pointer">{{
            item.label
          }}</label>
        </div>
      </div>
      <AuthInput v-model="formData.birthDay" :type="'date'" name="date" />
      <AuthInput v-model="formData.email" :placeholder="'Email'" name="email" :isRequired="true" />
      <AuthInput
        v-if="isLogin"
        v-model="formData.password"
        :placeholder="'Mật khẩu'"
        :isRequired="true"
        name="password"
      />

      <div class="text-[13px] text-[#9e9e9e]">
        This site is protected by reCAPTCHA and the Google
        <span class="text-[#2962ff]">Privacy Policy</span> and
        <span class="text-[#2962ff]">Terms of Service</span> apply.
      </div>

      <div class="!mt-[30px] flex items-center gap-5">
        <ButtonComp :text="'Đăng ký'" :isBlue="true" class="font-semibold !px-7 !py-4" />
        <div class="text-[#9e9e9e] text-sm font-medium">
          <p @click="handleAuth" class="text-[#080808] cursor-pointer">Đăng nhập</p>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import AuthInput from '@/components/ui/auth/AuthInput.vue'
import ButtonComp from '@/components/ui/ButtonComp.vue'

import { Form } from 'vee-validate'
import { SignUpSchema } from '@/schemas/SignUpSchema'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useAuthStore } from '@/stores/auth'

export default defineComponent({
  name: 'AuthRegister',
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

    const selectedGender = ref('nam')
    const dataGender = ref([
      {
        label: 'Nam',
        value: 'nam',
      },
      {
        label: 'Nữ',
        value: 'nu',
      },
    ])

    const formData = reactive({
      firstName: '',
      username: '',
      gender: 'nam',
      birthDay: '',
      email: '',
      password: '',
      guestId: guestId.value,
    })

    function handleAuth() {
      authStore.handleAuth('login', 'Đăng nhập')
    }

    async function handleSubmit() {
      // console.log('Data:', { ...formData })
      const submitData = { ...formData }
      const response = await authStore.handleRegister(
        submitData as { email: string; password: string; username: string },
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

    return {
      isMobile,
      isDesktop,
      authStore,
      isLogin,
      selectedGender,
      dataGender,
      formData,
      handleAuth,
      handleSubmit,
      SignUpSchema,
    }
  },
})
</script>
