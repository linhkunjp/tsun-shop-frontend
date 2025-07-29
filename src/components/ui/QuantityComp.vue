<template>
  <div>
    <div class="inline-flex items-center space-x-4 text-black font-bold">
      <button
        :class="{
          'border-r-0 !px-2.5 !py-2': !border,
          'w-[25px] h-[25px] !text-sm': border,
        }"
        class="text-xl cursor-pointer border border-gray-300"
        @click="decrease"
        :disabled="quantity <= min"
      >
        <span :class="{ 'opacity-40 !cursor-not-allowed': quantity <= min }">-</span>
      </button>

      <input
        type="number"
        v-model="quantity"
        :min="min"
        :max="max"
        @input="validateInput"
        :class="{
          'h-[46px] !px-2 w-12': !border,
          'h-[25px] !text-sm !px-0 w-10 bg-[#ededed] !font-medium': border,
        }"
        class="text-lg text-center border border-x-0 border-gray-300"
      />

      <button
        :class="{
          'border-l-0 !px-2.5 !py-2': !border,
          'w-[25px] h-[25px] !text-sm': border,
        }"
        class="text-xl cursor-pointer border border-gray-300"
        @click="increase"
        :disabled="quantity >= max"
      >
        <span :class="{ 'opacity-40 !cursor-not-allowed': quantity >= max }">+</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted, computed } from 'vue'

export default {
  name: 'QuantityComp',
  props: {
    border: {
      type: Boolean,
      default: false,
    },

    dataQuantity: Number,
  },

  setup(props, { emit }) {
    const quantity = ref(props.dataQuantity || 1)
    const min = 1
    const max = 5

    const decrease = () => {
      if (quantity.value > min) {
        quantity.value--
      }
    }

    const increase = () => {
      if (quantity.value < max) {
        quantity.value++
      }
    }

    const validateInput = () => {
      if (quantity.value < min) quantity.value = min
      if (quantity.value > max) quantity.value = max
    }

    watch(quantity, (newVal) => {
      emit('quantity', newVal)
    })

    onMounted(() => {
      emit('quantity', quantity.value)
    })

    return {
      quantity,
      min,
      max,
      decrease,
      increase,
      validateInput,
    }
  },
}
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
