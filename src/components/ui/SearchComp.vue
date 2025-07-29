<template>
  <div
    ref="containerRef"
    class="rounded-sm text-black bg-white h-[35px] flex items-center relative"
  >
    <input
      v-model="query"
      @keyup.enter="submitSearch"
      class="input-search border-none text-[13px] leading-none w-full h-full pl-2"
      :placeholder="text"
    />

    <button
      @click="submitSearch"
      class="opacity-[.4] cursor-pointer border-none shadow-none px-3 py-3"
    >
      <i class="fa-solid fa-magnifying-glass text-search w-[16px] h-[16px]"></i>
    </button>

    <!-- Results -->
    <div
      v-if="showResults && routePath !== '/search'"
      class="absolute left-0 right-0 top-[37px] bg-white rounded-sm shadow-md z-10"
    >
      <template v-if="results.length > 0">
        <RouterLink
          :to="`/products/${item.slug}`"
          v-for="(item, index) in results.slice(0, 5)"
          :key="index"
          class="flex items-start p-2.5 border-b border-[#dfe0e1] cursor-pointer select-none hover:opacity-[.7]"
        >
          <div class="text-xs text-black !mr-2 flex-1">
            <span class="font-medium !mb-2 title">{{ item.title }}</span>
            <div>
              <p v-if="item.pro_sale" class="!mr-2 float-left">
                {{ item.pro_price }}
              </p>
              <p :class="item.pro_sale ? 'line-through' : ''" class="float-left">
                {{ item.regular_price }}
              </p>
            </div>
          </div>
          <img :src="item.images[0]" class="w-[40px]" />
        </RouterLink>

        <!-- See more -->
        <RouterLink
          v-if="results.length > 5"
          :to="{ path: '/search', query: { q: query } }"
          class="text-black font-semibold text-sm !py-2.5 !text-center block"
        >
          Xem thêm <span>{{ totalResults - 5 }}</span> sản phẩm
        </RouterLink>
      </template>
      <p v-else class="text-black text-[13px] !py-2 !px-2 !ml-2">Không có sản phẩm nào</p>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import debounce from 'lodash.debounce'

import { useSearchStore } from '@/stores/search'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'SearchComp',
  mixins: [deviceMixin],
  props: {
    text: String,
  },

  setup() {
    const isMobile = ref(false)
    const query = ref('')
    const showResults = ref(false)
    const routePath = ref('')

    const route = useRoute()
    const router = useRouter()
    const searchStore = useSearchStore()
    const containerRef = ref<HTMLElement | null>(null)

    const results = computed(() => searchStore.dataProducts || [])
    const totalResults = computed(() => searchStore.dataPageInfo.total || 0)

    async function handleSearch() {
      await searchStore.searchProduct(query.value, 1)
      showResults.value = true
    }

    function submitSearch() {
      if (query.value.trim() == '') return
      showResults.value = false
      router.push({ path: '/search', query: { q: query.value } })
    }

    const debouncedSearch = debounce(handleSearch, 1000)

    watch(query, (val) => {
      if (val.trim() == '') {
        showResults.value = false
      } else {
        debouncedSearch()
      }
    })

    watch(
      () => route.path,
      (newVal) => {
        routePath.value = newVal
        query.value = ''
      },
      { immediate: true },
    )

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
        showResults.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      debouncedSearch.cancel()
      document.removeEventListener('click', handleClickOutside)
    })

    return {
      isMobile,
      showResults,
      query,
      results,
      totalResults,
      containerRef,
      routePath,
      handleSearch,
      submitSearch,
    }
  },
}
</script>

<style scoped>
span.title {
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-align: left;
  overflow: hidden;
}
</style>
