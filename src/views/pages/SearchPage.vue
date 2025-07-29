<template>
  <div>
    <BreadCrumb :dataBreadcrumb="dataBreadcrumb" />

    <!-- Content -->
    <div class="container !my-9">
      <!-- Title -->
      <div
        class="text-center after:content-[''] after:block after:bg-[#252a2b] after:w-[60px] after:h-[4px] after:!my-[25px] after:!ml-auto after:!mr-auto"
      >
        <h1 :class="isDesktop ? 'text-[30px]' : 'text-[20px]'" class="font-bold text-black">
          Tìm kiếm
        </h1>
        <p v-if="data.length > 0" class="text-sm text-[#080808] opacity-[.66]">
          Có {{ totalResults }} sản phẩm cho tìm kiếm
        </p>
      </div>

      <div :class="{ 'min-h-[600px]': searchStore.isLoading }" class="relative">
        <LoadingComp v-if="searchStore.isLoading" />
        <!-- No found -->
        <div v-if="data.length == 0" class="text-center !mb-20">
          <h2 class="text-black text-[22px] font-bold">Không tìm thấy nội dung bạn yêu cầu</h2>
          <span class="text-sm text-black"
            >Không tìm thấy <strong>" {{ searchQuery }}"</strong>. Vui lòng kiểm tra chính tả, sử
            dụng các từ tổng quát hơn và thử lại!</span
          >

          <div
            :class="isMobile ? 'w-full' : 'w-[60%]'"
            class="!ml-auto !mr-auto flex items-center justify-center !mt-[40px]"
          >
            <input
              v-model="query"
              @keyup.enter="submitSearch"
              :class="isMobile ? 'w-full' : 'search'"
              class="border-none text-black !h-[55px] !px-[20px] bg-[#ededed]"
              placeholder="Tìm kiếm"
            />
            <button
              @click="submitSearch"
              class="border-none bg-black h-[55px] w-[55px] opacity-[.8] cursor-pointer"
            >
              <i
                class="fa-solid fa-magnifying-glass text-[22px] font-normal text-white border-none w-6 h-6"
              ></i>
            </button>
          </div>
        </div>

        <!-- Result -->
        <div v-else class="h-full">
          <span class="text-black text-sm !mb-10 block"
            >Kết quả tìm kiếm cho <strong>" {{ searchQuery }}"</strong>.</span
          >
          <ProdList
            :onPageChange="handlePageChange"
            :dataResults="searchStore.dataProducts"
            :dataPageInfo="searchStore.dataPageInfo"
            :dynamicClass="{ 'grid-cols-5': isDesktop, 'grid-cols-2': !isDesktop }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import BreadCrumb from '@/components/ui/BreadCrumb.vue'
import ProdList from '@/components/ui/product/ProdList.vue'
import LoadingComp from '@/components/ui/LoadingComp.vue'

import { useSearchStore } from '@/stores/search'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'SearchPage',
  mixins: [deviceMixin],
  components: {
    BreadCrumb,
    ProdList,
    LoadingComp,
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const currentPage = ref(1)

    const route = useRoute()
    const router = useRouter()

    const query = ref('')
    const searchQuery = computed(() => {
      const q = route.query.q
      return typeof q === 'string' ? q : Array.isArray(q) ? (q[0] ?? '') : searchStore.searchQuery
    })
    const searchStore = useSearchStore()
    const totalResults = computed(() => searchStore.dataPageInfo.total || 0)

    const data = computed(() => searchStore.dataProducts || [])
    const dataBreadcrumb = ['Tìm kiếm']

    function submitSearch() {
      if (query.value.trim() == '') return
      router.push({ path: '/search', query: { q: query.value } })
    }

    // Nhận dữ liệu currentPage từ Pagination
    function onPageChange(page: number) {
      currentPage.value = page
    }

    async function handlePageChange(page: number) {
      currentPage.value = page
      await searchStore.searchProduct(searchQuery.value, page)
    }

    watch(
      () => route.query.q,
      async (newVal) => {
        if (newVal) {
          await searchStore.searchProduct(searchQuery.value, currentPage.value)
        }
      },
      { immediate: true },
    )

    onMounted(async () => {
      document.title = 'Kết quả tìm kiếm - tsunsg'
    })

    return {
      isMobile,
      isDesktop,
      data,
      dataBreadcrumb,
      query,
      searchQuery,
      searchStore,
      totalResults,
      onPageChange,
      handlePageChange,
      submitSearch,
    }
  },
}
</script>

<style scoped>
input.search {
  width: calc(100% - 55px);
}
</style>
