<template>
  <div v-if="!currentCategory">
    <NotFound />
  </div>
  <div v-else>
    <BreadCrumb :dataBreadcrumb="dataBreadcrumb" />

    <!-- Content -->
    <div class="container !my-9">
      <!-- Title -->
      <div
        class="text-center after:content-[''] after:block after:bg-[#252a2b] after:w-[60px] after:h-[4px] after:!my-[25px] after:!ml-auto after:!mr-auto"
      >
        <h1 :class="isDesktop ? 'text-[30px]' : 'text-[20px]'" class="font-bold text-black">
          {{ currentCategory?.title }}
        </h1>
      </div>

      <div :class="{ 'min-h-[600px]': collectionStore.isLoading }" class="relative">
        <LoadingComp v-if="collectionStore.isLoading" />
        <!-- Sort -->
        <template v-if="collectionStore.dataProducts?.length > 0">
          <div class="text-right !mt-4 !mb-10 relative select">
            <label
              class="text-black text-xs absolute top-0 bottom-0 !my-auto w-[35px] h-[20px] leading-[20px] text-center"
              ><i class="fa-solid fa-arrow-down-a-z !font-normal text-black"></i
            ></label>
            <select
              v-model="selectedSort"
              class="text-xs text-[#676767] h-[30px] bg-[#fafafa] border border-[#e7e7e7] !pr-[40px] !pl-[30px] rounded cursor-pointer"
            >
              <option v-for="option in sortOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Result -->
          <div class="h-full !mx-auto">
            <ProdList
              :dataResults="collectionStore.dataProducts"
              :dataPageInfo="collectionStore.dataPageInfo"
              :slug="slug"
              :sortQuery="selectedSort"
              :onPageChange="handlePageChange"
              :dynamicClass="{
                'grid-cols-4': isDesktop,
                'grid-cols-3': isTablet,
                'grid-cols-2': isMobile,
              }"
            />
          </div>
        </template>
        <template v-if="collectionStore.dataProducts?.length == 0">
          <NotFound
            :title="'Không tìm thấy sản phẩm'"
            :content="'Xin lỗi, hiện không có sản phẩm ở trang này'"
            :minHeight="'h-[50vh]'"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import BreadCrumb from '@/components/ui/BreadCrumb.vue'
import ProdList from '@/components/ui/product/ProdList.vue'
import NotFound from '@/views/pages/NotFound.vue'
import LoadingComp from '@/components/ui/LoadingComp.vue'
import json from '@/utils/json.json'

import { useRoute } from 'vue-router'
import { useCollectionStore } from '@/stores/collection'

export default {
  name: 'CollectionPage',
  mixins: [deviceMixin],
  components: {
    BreadCrumb,
    ProdList,
    NotFound,
    LoadingComp,
  },

  setup() {
    const isMobile = ref(false)
    const isTablet = ref(false)
    const isDesktop = ref(false)

    const collectionStore = useCollectionStore()
    const route = useRoute()
    const slug = computed(() => route.params.slug as string)
    const currentPage = ref(1)

    const selectedSort = ref('created_asc')

    const sortOptions = [
      { label: 'Giá: Tăng dần', value: 'price_asc' },
      { label: 'Giá: Giảm dần', value: 'price_desc' },
      { label: 'Tên: A-Z', value: 'name_asc' },
      { label: 'Tên: Z-A', value: 'name_desc' },
      { label: 'Mới nhất', value: 'created_asc' },
      { label: 'Cũ nhất', value: 'created_desc' },
    ]

    // Lấy ra item trùng với slug để hiển thị title
    const findCategoryBySlug = (slugValue: any) => {
      for (const category of json) {
        if (category.slug === slugValue) return category
        if (category.children && Array.isArray(category.children)) {
          const child = category.children.find((c: any) => c.slug === slugValue)
          if (child) return child
        }
      }
      return null
    }

    const currentCategory = computed(() => findCategoryBySlug(slug.value))
    const dataBreadcrumb = computed(() => {
      return ['Danh mục', currentCategory.value?.title || '']
    })

    // Nhận dữ liệu currentPage từ Pagination
    async function handlePageChange(page: number) {
      currentPage.value = page
      collectionStore.isLoading = true
      await collectionStore.getProductList(
        slug.value as string,
        currentPage.value,
        selectedSort.value,
      )
      collectionStore.isLoading = false
    }

    // Theo dõi thay đổi của slug
    watch(
      () => route.params.slug,
      async (newVal) => {
        // slug.value = newVal

        await collectionStore.getProductList(newVal as string, 1, selectedSort.value)
      },
    )

    // Theo dõi thay đổi của selectedSort
    watch(
      () => selectedSort.value,
      async (newVal) => {
        await collectionStore.getProductList(slug.value as string, currentPage.value, newVal)
      },
    )

    onMounted(async () => {
      if (!currentCategory.value) return
      document.title = currentCategory.value.title + ' - tsunsg'
      await collectionStore.getProductList(
        slug.value as string,
        currentPage.value,
        selectedSort.value,
      )
    })

    return {
      isMobile,
      isTablet,
      isDesktop,
      selectedSort,
      dataBreadcrumb,
      sortOptions,
      collectionStore,
      slug,
      currentCategory,
      currentPage,
      handlePageChange,
    }
  },
}
</script>

<style scoped>
.select::after {
  content: '';
  display: block;
  position: absolute;
  top: 40%;
  right: 18px;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 7px 6px 0 6px;
  border-color: #bababa transparent transparent transparent;
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
</style>
