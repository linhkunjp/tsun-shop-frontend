<template>
  <div :class="{ 'border-r border-[#e1e1e1] !pr-[4em]': isDesktop }" class="!pb-[4em] flex-1">
    <!-- Header -->
    <div v-if="isDesktop" class="text-black !pt-[3em]">
      <h1 class="text-[28px] font-medium">tsunsg</h1>
      <div class="text-xs font-medium !mt-2">
        <a class="text-[#338dbc] !mr-1">Giỏ hàng</a> >
        <span class="!ml-1">Thông tin giao hàng</span>
      </div>
    </div>

    <!-- Main -->
    <div class="!mt-3">
      <h2 class="text-[#333333] text-[18px] font-medium">Thông tin giao hàng</h2>
      <p v-if="!authStore.token" class="text-[#737373] text-sm font-medium !mt-4">
        Bạn đã có tài khoản? <a class="text-[#338dbc]">Đăng nhập</a>
      </p>

      <Form @submit="orderComplete" :validation-schema="OrderSchema">
        <!-- Form -->
        <div class="!mt-3">
          <InputComp v-model="authStore.username" :placeholder="'Họ và tên'" name="fullName" />
          <div class="flex !my-3">
            <InputComp
              v-model="authStore.email"
              :placeholder="'Email'"
              name="email"
              class="flex-1 !mr-3"
            />
            <InputComp v-model="phoneNumber" :placeholder="'Số điện thoại'" name="phoneNumber" />
          </div>
          <InputComp v-model="address" :placeholder="'Địa chỉ'" name="address" />
        </div>

        <div class="flex gap-3 !mt-3">
          <SelectComp
            v-model="provinceCode"
            :options="dataProvinces"
            :label="'Chọn tỉnh / thành'"
            :placeholder="'Tỉnh / thành'"
            name="province"
            class="w-full"
          />
          <SelectComp
            v-model="districtCode"
            :options="dataDistricts"
            :label="'Chọn quận / huyện'"
            :placeholder="'Quận / huyện'"
            name="district"
            class="w-full"
          />
          <SelectComp
            v-model="wardCode"
            :options="dataWards"
            :label="'Chọn phường / xã'"
            :placeholder="'Phường / xã'"
            name="ward"
            class="w-full"
          />
        </div>

        <MethodLayout />

        <!-- Action -->
        <div
          :class="{ 'flex-col-reverse': isMobile }"
          class="!mt-6 text-sm flex items-center justify-between"
        >
          <div
            @click="goToCart"
            :class="{
              '!mt-4': isMobile,
              'pointer-events-none !border-[#ccc]': isDisabled,
            }"
            class="text-[#338dbc] font-medium cursor-pointer"
          >
            Giỏ hàng
          </div>
          <button
            :class="{
              'w-full': isMobile,
              'pointer-events-none !bg-[#ccc] !border-[#ccc]': isDisabled,
            }"
            class="text-white bg-[#338dbc] rounded !py-[1.4em] !px-[1.7em] cursor-pointer hover:brightness-[1.2]"
          >
            Hoàn tất đơn hàng
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import InputComp from './components/InputComp.vue'
import SelectComp from './components/SelectComp.vue'
import MethodLayout from '@/components/ui/checkout/components/MethodLayout.vue'

import { Form } from 'vee-validate'
import { OrderSchema } from '@/schemas/OrderSchema'
import { getNameByCode } from '@/utils/methods'
import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

import AddressService from '@/services/AddressService'
import OrderService from '@/services/OrderService'

interface AddressOption {
  name: string
  code: number
}

export default {
  name: 'CheckoutMain',
  mixins: [deviceMixin],
  components: {
    InputComp,
    MethodLayout,
    SelectComp,
    Form,
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const sidebarStore = useSidebarStore()
    const cartStore = useCartStore()
    const authStore = useAuthStore()
    const router = useRouter()
    const toast = useToast()
    const isDisabled = ref(false)

    const dataProvinces = ref([])
    const dataDistricts = ref([])
    const dataWards = ref<AddressOption[]>([])

    const provinceCode = ref(null)
    const districtCode = ref(null)
    const wardCode = ref(null)

    const phoneNumber = ref('')
    const address = ref('')

    function goToCart() {
      if (isDisabled.value) return
      sidebarStore.isOpen = false
      router.push('/cart')
    }

    async function orderComplete() {
      if (isDisabled.value) return
      const formData = {
        userId: cartStore.userId,
        items: cartStore.dataCart.map(({ _id, ...item }) => item),
        totalAmount: cartStore.totalAmount,
        phoneNumber: phoneNumber.value,
        email: authStore.email,
        fullName: authStore.username,
        address: address.value,
        province: getNameByCode(dataProvinces.value, provinceCode.value || 1),
        district: getNameByCode(dataDistricts.value, districtCode.value || 1),
        ward: getNameByCode(dataWards.value, wardCode.value || 1),
      }
      // console.log(formData)
      authStore.isLoading = true
      const result = await OrderService.createOrder(formData)

      if (result.isSuccess == false) {
        authStore.isLoading = false
        toast.add({
          severity: 'error',
          summary: result.message,
          group: 'tl',
          life: 3000,
        })
      } else {
        isDisabled.value = true
        authStore.isLoading = false
        toast.add({
          severity: 'success',
          summary: result.message,
          group: 'tl',
          life: 5000,
        })

        setTimeout(async () => {
          await cartStore.clearCart()
          router.push('/')
        }, 4000)
      }
    }

    async function getProvinces() {
      const data = await AddressService.getProvinces()
      dataProvinces.value = data
    }

    async function getDistricts(code: number) {
      const data = await AddressService.getDistricts(code)
      dataDistricts.value = data.districts
    }

    async function getWards(code: number) {
      const data = await AddressService.getWards(code)
      dataWards.value = data.wards
    }

    watch(provinceCode, async (val) => {
      districtCode.value = null
      wardCode.value = null

      // dataWards.value = []
      dataWards.value = [{ name: 'Phường/ xã', code: 1 }]

      if (val !== null) {
        await getDistricts(val)
      }
    })

    watch(districtCode, async (val) => {
      wardCode.value = null
      // dataWards.value = []

      if (val !== null) {
        await getWards(val)
      }
    })

    onMounted(async () => {
      await getProvinces()
    })

    return {
      isMobile,
      isDesktop,
      authStore,
      dataProvinces,
      dataDistricts,
      dataWards,
      provinceCode,
      districtCode,
      wardCode,
      phoneNumber,
      address,
      isDisabled,
      goToCart,
      orderComplete,
      OrderSchema,
    }
  },
}
</script>

<style scoped>
* {
  font-family:
    Helvetica Neue,
    sans-serif !important;
}

input#payment {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>
