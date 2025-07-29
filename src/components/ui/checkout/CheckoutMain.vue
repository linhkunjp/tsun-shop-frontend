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

      <!-- Form -->
      <div class="!mt-3">
        <InputComp v-model="authStore.username" :placeholder="'Họ và tên'" />
        <div class="flex !my-3">
          <InputComp v-model="authStore.email" :placeholder="'Email'" class="flex-1 !mr-3" />
          <InputComp :placeholder="'Số điện thoại'" />
        </div>
        <InputComp :placeholder="'Địa chỉ'" />
      </div>

      <div class="flex gap-3 !mt-3">
        <SelectComp
          v-model="provinceCode"
          :options="dataProvinces"
          :label="'Chọn tỉnh / thành'"
          :placeholder="'Tỉnh / thành'"
          class="w-full"
        />
        <SelectComp
          v-model="districtCode"
          :options="dataDistricts"
          :label="'Chọn quận / huyện'"
          :placeholder="'Quận / huyện'"
          class="w-full"
        />
        <SelectComp
          v-model="wardCode"
          :options="dataWards"
          :label="'Chọn phường / xã'"
          :placeholder="'Phường / xã'"
          class="w-full"
        />
      </div>

      <div class="!mt-6">
        <h2 class="text-[#333333] text-[18px] font-medium">Phương thức vận chuyển</h2>
        <div
          class="border border-[#d9d9d9] rounded !px-[1.5em] !py-[3em] flex flex-col items-center !mt-3"
        >
          <img src="@/assets/img/icon-box.svg" />
          <p class="text-[#737373] text-sm font-medium !mt-4">
            Vui lòng chọn quận / huyện để có danh sách phương thức vận chuyển.
          </p>
        </div>
      </div>

      <div class="!mt-6">
        <h2 class="text-[#333333] text-[18px] font-medium">Phương thức Thanh toán</h2>
        <div class="border border-[#d9d9d9] rounded flex flex-col items-center !mt-3">
          <div class="w-full border-b border-[#d9d9d9]">
            <label class="w-full flex items-center gap-4 !p-[1.3em] cursor-pointer" for="payment">
              <input id="payment" type="radio" checked />
              <p class="text-[#737373] text-sm font-medium">Thanh toán khi giao hàng (COD)</p>
            </label>
          </div>
          <div class="w-full text-center !px-[1.3em] !py-[2em] bg-[#fafafa]">
            <p class="text-[#737373] text-sm font-medium">
              Khi Shipper đến nhận hàng , vui lòng trả tiền trực tiếp cho Shipper !
            </p>
          </div>
        </div>
      </div>

      <!-- Action -->
      <div
        :class="{ 'flex-col-reverse': isMobile }"
        class="!mt-6 text-sm flex items-center justify-between"
      >
        <div
          @click="goToCart"
          :class="{ '!mt-4': isMobile }"
          class="text-[#338dbc] font-medium cursor-pointer"
        >
          Giỏ hàng
        </div>
        <button
          :class="{ 'w-full': isMobile }"
          class="text-white bg-[#338dbc] rounded !py-[1.4em] !px-[1.7em] cursor-pointer hover:brightness-[1.2]"
        >
          Hoàn tất đơn hàng
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import InputComp from '@/components/ui/InputComp.vue'
import SelectComp from '@/components/ui/SelectComp.vue'

import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import AddressService from '@/services/AddressService'

export default {
  name: 'CheckoutMain',
  mixins: [deviceMixin],
  components: {
    InputComp,
    SelectComp,
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const sidebarStore = useSidebarStore()
    const authStore = useAuthStore()
    const router = useRouter()

    const dataProvinces = ref([])
    const dataDistricts = ref([])
    const dataWards = ref([])
    const provinceCode = ref(null)
    const districtCode = ref(null)
    const wardCode = ref(null)

    function goToCart() {
      sidebarStore.isOpen = false
      router.push('/cart')
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
      provinceCode.value = val
      districtCode.value = null
      wardCode.value = null
      dataWards.value = []
      if (val !== null) {
        await getDistricts(val)
      }
    })

    watch(districtCode, async (val) => {
      districtCode.value = val
      wardCode.value = null
      dataWards.value = []
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
      goToCart,
      authStore,
      dataProvinces,
      dataDistricts,
      dataWards,
      provinceCode,
      districtCode,
      wardCode,
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
