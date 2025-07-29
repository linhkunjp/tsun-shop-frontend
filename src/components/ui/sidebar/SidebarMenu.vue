<template>
  <div class="h-full !mb-14">
    <div class="!mb-8">
      <ul class="text-black !text-xl">
        <li v-for="(item, index) in json" :key="index" class="py-2 mb-1 leading-none flex flex-col">
          <!-- Main -->
          <div class="flex -items-center justify-between w-full">
            <RouterLink
              :to="`/collections/${item.slug}`"
              @click="setTitle(item.title)"
              class="w-full"
              ><span class="!font-bold">{{ item.label }}</span></RouterLink
            >
            <span
              v-if="item.children && item.children.length > 0"
              @click="openMenu(index)"
              class="w-[40px] !text-[25px] inline-block cursor-pointer text-center"
              ><i
                :class="{ 'rotate-180': isOpenMenu[index] }"
                class="fa fa-angle-down tsun-transition-arrow"
              ></i
            ></span>
          </div>

          <!-- Children -->
          <Transition
            enter-active-class="transition-[max-height] duration-700 ease-in-out"
            enter-from-class="max-h-0"
            enter-to-class="max-h-40"
            leave-active-class="transition-[max-height] duration-600 ease-in-out"
            leave-from-class="max-h-96"
            leave-to-class="max-h-0"
          >
            <ul v-show="isOpenMenu[index]" class="text-black !text-base !ml-1 overflow-hidden">
              <li
                v-for="(child, index) in item.children"
                :key="index"
                class="py-2 !mb-1 leading-none flex items-center justify-between w-full px-4 cursor-pointer"
              >
                <RouterLink :to="`/collections/${child.slug}`" @click="setTitle(child.title)">
                  <span class="!font-bold">{{ child.label }}</span></RouterLink
                >
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </div>

    <div>
      <ul class="text-black !text-[15px]">
        <li v-for="(item, index) in json" :key="index" class="py-2 mb-1 leading-none">
          <div>
            <span class="!font-regular">{{ item.label }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import deviceMixin from '@/utils/deviceMixin'

import json from '@/utils/json.json'

export default {
  name: 'SidebarMenu',
  mixins: [deviceMixin],

  setup() {
    const sidebarStore = useSidebarStore()
    const isMobile = ref(false)
    const isOpenMenu = ref<boolean[]>([])

    function openMenu(i: number) {
      isOpenMenu.value[i] = !isOpenMenu.value[i]
    }

    function setTitle(title: string) {
      sidebarStore.openSidebar(false, '')
      document.title = title + ' - tsunsg'
    }

    return {
      isMobile,
      sidebarStore,
      openMenu,
      setTitle,
      json,
      isOpenMenu,
    }
  },
}
</script>
