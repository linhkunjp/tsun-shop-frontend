<template>
  <div class="relative text-[#737373]">
    <label :class="{ '!opacity-100': inputValue !== '' }">{{ placeholder }}</label>
    <input
      :value="inputValue"
      @input="updateValue($event)"
      :placeholder="placeholder"
      :class="{ '!pt-[1.5em] !pb-[0.38em]': inputValue !== '' }"
    />
  </div>
</template>
<script lang="ts">
import { ref, watch } from 'vue'
import deviceMixin from '@/utils/deviceMixin'

export default {
  name: 'InputComp',
  mixins: [deviceMixin],
  props: {
    placeholder: String,
    modelValue: {
      type: String,
      default: '',
    },
  },

  setup(props, { emit }) {
    const isMobile = ref(false)
    const inputValue = ref(props.modelValue)

    watch(
      () => props.modelValue,
      (newVal) => {
        inputValue.value = newVal
      },
    )

    function updateValue(event: Event) {
      const target = event.target as HTMLInputElement
      inputValue.value = target.value
      emit('update:modelValue', inputValue.value)
    }

    return {
      isMobile,
      inputValue,
      updateValue,
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

input {
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
  height: 43px;
  font-size: 14px;
}

input:focus {
  box-shadow: 0 0 0 2px #338dbc;
  outline: none;
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
