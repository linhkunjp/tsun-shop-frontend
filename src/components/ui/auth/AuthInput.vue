<template>
  <div>
    <span class="text-black text-sm font-semibold opacity-80 block !mb-1"
      >{{ placeholder }} <span v-if="isRequired" class="text-[red]"> *</span></span
    >
    <Field
      v-slot="{ field, errorMessage }"
      @update:modelValue="updateValue"
      :name="name"
      :value="modelValue"
      :validateOnChange="true"
      :validateOnBlur="false"
    >
      <input
        :placeholder="placeholder"
        :type="type"
        v-bind="field"
        :class="{ '!mb-[30px]': !errorMessage }"
        class="px-5 bg-[#ededed] border border-transparent text-black font-medium h-[55px] w-full focus:!border-[#ededed] focus:!bg-white text-sm"
      />

      <span
        v-if="errorMessage"
        class="text-sm text-[red] font-semibold opacity-80 block !mt-2 !mb-[20px]"
        >{{ errorMessage }}</span
      >
    </Field>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import { Field } from 'vee-validate'

export default {
  name: 'AuthInput',
  mixins: [deviceMixin],
  props: {
    name: { type: String, required: true },
    placeholder: String,
    type: String,
    modelValue: String,
    isRequired: Boolean,
  },
  components: {
    Field,
  },

  setup(props, { emit }) {
    const isMobile = ref(false)
    const isDesktop = ref(false)

    const updateValue = (value: any) => {
      emit('update:modelValue', value)
    }

    return {
      isMobile,
      isDesktop,
      updateValue,
    }
  },
}
</script>
