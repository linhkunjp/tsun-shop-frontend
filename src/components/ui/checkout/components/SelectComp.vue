<template>
  <div class="text-[#737373]">
    <Field
      v-slot="{ field, errorMessage }"
      v-model="internalValue"
      :name="name"
      :validateOnChange="true"
      :validateOnBlur="false"
    >
      <div class="relative">
        <label :class="{ '!opacity-100': internalValue !== null }">{{ label }}</label>
        <select v-bind="field" :class="{ '!pt-[1.6em] !pb-[0.38em]': internalValue !== null }">
          <option disabled value="">{{ placeholder }}</option>

          <option v-for="(item, index) in options" :key="index" :value="item.code">
            {{ item.name }}
          </option>
        </select>
      </div>

      <span v-if="errorMessage" class="text-sm text-[red] opacity-80 block !mt-2">{{
        errorMessage
      }}</span>
    </Field>
  </div>
</template>
<script lang="ts">
import { ref, watch } from 'vue'
import type { PropType } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import { Field } from 'vee-validate'

interface DataOptions {
  name: String
  code: Number
}

export default {
  name: 'SelectComp',
  mixins: [deviceMixin],
  components: {
    Field,
  },
  props: {
    placeholder: String,
    name: { type: String, required: true },
    label: String,
    options: {
      type: Array as PropType<DataOptions[]>,
      default: () => [],
    },
    modelValue: {
      type: [String, Number, null] as PropType<string | number | null>,
      default: null,
    },
  },

  setup(props, { emit }) {
    const isMobile = ref(false)
    const internalValue = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (newVal) => {
        internalValue.value = newVal
      },
    )

    watch(internalValue, (val) => {
      emit('update:modelValue', val)
    })

    return {
      isMobile,
      internalValue,
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

select {
  box-shadow: 0 0 0 1px #d9d9d9;
  transition: all 0.2s ease-out;
  background-color: white;
  color: #333333;
  border-radius: 4px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.94em 2.8em 0.94em 0.8em;
  word-break: normal;
  height: 48px;
  font-size: 14px;
  cursor: pointer;
}

select:focus {
  box-shadow: 0 0 0 2px #338dbc;
  outline: none;
}

.relative::before {
  background-image: url('@/assets/img/icon.svg'), none;
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 50px;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: none;
}

select {
  /*for firefox*/
  -moz-appearance: none;
  /*for chrome*/
  -webkit-appearance: none;
  appearance: none;
}
/*for IE10+*/
select::-ms-expand {
  display: none;
}

label {
  font-size: 12px;
  font-weight: normal;
  position: absolute;
  top: 0;
  width: 100%;
  padding: 0 0.93333em;
  z-index: 1;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transform: translateY(3px);
  transform: translateY(3px);
  pointer-events: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  opacity: 0;
  -ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' 0 ')';
  filter: alpha(opacity=0);
  color: #999999;
  transition: all 0.2s ease-out;
  margin: 0.5em 0;
  margin-top: 0.3em;
  display: block;
}
</style>
