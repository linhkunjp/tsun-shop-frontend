<template>
  <div class="!mt-6">
    <h2 class="text-[#333333] text-[18px] font-medium">Phương thức vận chuyển</h2>
    <div class="border border-[#d9d9d9] rounded flex justify-between items-center !mt-3">
      <label class="w-full flex items-center gap-4 !p-[1.3em] cursor-pointer" for="payment">
        <input id="payment" type="radio" checked />
        <p class="text-[#737373] text-sm font-medium">Giao hàng tận nơi</p>
      </label>

      <span class="text-[#737373] text-sm font-medium block !pr-[1.3em]">35,000₫</span>
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
</template>

<script lang="ts">
export default {
  name: 'CheckoutMethod',

  setup() {
    return {}
  },
}
</script>

<style scoped>
* {
  font-family:
    Helvetica Neue,
    sans-serif !important;
}
</style>
