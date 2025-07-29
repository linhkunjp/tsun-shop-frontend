<template>
  <div v-for="(item, index) in data" :key="index">
    <span class="text-black text-sm !font-bold !my-4 block"
      >{{ item.title }}
      <span v-if="item.type == 'color'" class="text-xs text-[#3966b8] !font-medium !ml-1">{{
        selectedValues[item.type]
      }}</span></span
    >
    <div
      :class="{
        'gap-x-6 ': item.type === 'size',
        'gap-x-4 ': item.type === 'color',
      }"
      class="flex items-center"
    >
      <label
        v-for="i in item.options"
        :key="i.value"
        :class="{ 'opacity-40 !cursor-default': !i.available }"
        class="flex items-center cursor-pointer"
      >
        <input
          type="radio"
          v-model="selectedValues[item.type]"
          :value="i.value"
          class="hidden"
          :disabled="!i.available"
        />
        <div
          :class="{
            'w-[30px] h-[30px] shadow !ml-1': item.type === 'color',
            'border border-gray-300': item.type == 'size',
            'shadow-active': selectedValues[item.type] === i.value && item.type === 'color',
          }"
          :style="{
            backgroundColor: item.type === 'color' ? i.value.toLowerCase() : '',
          }"
          class="w-4 h-4 rounded-full flex items-center justify-center"
        >
          <i
            v-if="selectedValues[item.type] === i.value && item.type == 'size'"
            class="text-black text-[19px] fa-solid fa-circle-check"
          ></i>
        </div>
        <span v-if="item.type == 'size'" class="!ml-2 text-black text-[13px] font-semibold">
          {{ i.value }}
        </span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { PropType } from 'vue'
import type { Variants } from '@/types/product'

export default {
  name: 'RadioComp',
  props: {
    data: {
      type: Array as PropType<Variants[]>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const selectedValues = ref<Record<string, string>>({})

    // Lấy mặc định cho từng type (VD: "size", "color")
    props.data.forEach((variant) => {
      const firstAvailable = variant.options.find((opt) => opt.available)?.value || ''
      selectedValues.value[variant.type] = firstAvailable
    })

    // Watch toàn bộ object và emit mỗi khi có thay đổi
    watch(
      selectedValues,
      (newVal) => {
        emit('update:selected', { ...newVal })
      },
      { deep: true },
    )

    // Emit giá trị ban đầu
    onMounted(() => {
      emit('update:selected', { ...selectedValues.value })
    })

    return {
      selectedValues,
    }
  },
}
</script>

<style scoped>
.shadow-active {
  box-shadow:
    0px 0px 0px 1px #d3d3d3,
    0 0 0 4px #ffffff,
    0 0 0 5px #333e48 !important;
  -webkit-box-shadow:
    0px 0px 0px 1px #d3d3d3,
    0 0 0 4px #ffffff,
    0 0 0 5px #333e48 !important;
}

.shadow {
  box-shadow: 0px 0px 0px 2px #ededed;
  -webkit-box-shadow: 0px 0px 0px 2px #ededed;
}
</style>
