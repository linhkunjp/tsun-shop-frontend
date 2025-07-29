<template>
  <div v-if="isNotFound">
    <NotFound />
  </div>
  <div v-else>
    <BreadCrumb :dataBreadcrumb="dataBreadcrumbs" />

    <!-- Content -->
    <div
      :class="[
        isDesktop ? 'grid !mt-10' : 'flex flex-col ',
        isDesktop || isTablet ? 'gap-8 pb-12 !mt-6' : 'gap-4 !mt-4',
        { 'min-h-[800px]': productStore.isLoading },
      ]"
      class="grid-cols-2 items-start container relative"
    >
      <LoadingComp v-if="productStore.isLoading" />
      <div :class="{ '!grid-cols-1': isMobile }" class="grid grid-cols-2 gap-2 flex-2">
        <a v-for="i in dataImages" :key="i">
          <img :src="i" />
        </a>
      </div>

      <div class="flex-1 w-full h-full">
        <ProdDetail
          :dataDetail="productStore.dataProduct"
          :isBtnBuy="true"
          class="sticky top-[96px]"
        >
          <div class="!mt-6">
            <!-- Tabs Header -->
            <div
              class="product-tab flex border-b border-[#e1e1e1] overflow-x-auto overflow-y-hidden"
            >
              <div
                v-for="(tab, index) in dataTabs"
                :key="index"
                class="text-black text-sm font-semibold uppercase border-b border-transparent !py-3 cursor-pointer whitespace-nowrap"
                :class="{
                  '!text-[#888] !border-[#888888] !mb-[-1px]': selectedTab === index,
                  '!text-xs !mr-5': isMobile,
                  '!mr-7.5': !isMobile,
                }"
                @click="selectedTab = index"
              >
                {{ tab.name }}
              </div>
            </div>

            <!-- Tab Content -->
            <div
              v-if="dataTabs[selectedTab]"
              class="product-tab-content text-black !mt-5 text-[#080808] text-sm"
              v-html="dataTabs[selectedTab].content"
            ></div>
          </div>
        </ProdDetail>
      </div>
    </div>

    <!-- Slider -->
    <div
      :class="[isDesktop || isTablet ? ' max-w-[91%] !mt-6' : ' max-w-[96%] !mt-4']"
      class="w-full !mx-auto !mb-16"
    >
      <SingleSlide :data="productStore.dataProductRelated" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import BreadCrumb from '@/components/ui/BreadCrumb.vue'
import ProdDetail from '@/components/ui/product/ProdDetail.vue'
import SingleSlide from '@/components/ui/slider/SingleSlide.vue'
import NotFound from '@/views/pages/NotFound.vue'
import LoadingComp from '@/components/ui/LoadingComp.vue'

import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCollectionStore } from '@/stores/collection'

export default {
  name: 'ProductPage',
  mixins: [deviceMixin],
  components: {
    BreadCrumb,
    ProdDetail,
    SingleSlide,
    NotFound,
    LoadingComp,
  },

  setup() {
    const isMobile = ref(false)
    const isDesktop = ref(false)
    const isNotFound = ref(false)

    const route = useRoute()
    const slug = ref(route.params.slug)
    const productStore = useProductStore()
    const collectionStore = useCollectionStore()

    const dataImages = computed(() => productStore.dataProduct.images || [])
    const dataBreadcrumbs = computed(() => productStore.dataProduct.breadcrumbs || [])
    const dataTabs = computed(() => productStore.dataProduct.tabs || [])
    const selectedTab = ref(0)

    // Theo dõi thay đổi của slug
    watch(
      () => route.params.slug,
      async (newVal) => {
        slug.value = newVal

        await productStore.getProductDetail(slug.value as string)
      },
    )

    onMounted(async () => {
      if (productStore.productCache[slug.value as string]) {
        return
      }
      const dataRelated = await collectionStore.getProductList('', 1, 'price_desc')
      productStore.dataProductRelated = dataRelated ?? []
      const data = await productStore.getProductDetail(slug.value as string)
      // Kiểm tra nếu sản phẩm ko tồn tại
      if (!data) {
        isNotFound.value = true
      }
    })

    return {
      isMobile,
      isDesktop,
      dataImages,
      dataTabs,
      selectedTab,
      dataBreadcrumbs,
      slug,
      productStore,
      isNotFound,
    }
  },
}
</script>

<style>
.product-tab-content > p {
  margin-bottom: 10px;
}

.product-tab::-webkit-scrollbar,
.scroll-y::-webkit-scrollbar {
  width: 5px;
  height: 3px;
  margin-bottom: -6px;
}

.product-tab::-webkit-scrollbar-thumb,
.scroll-y::-webkit-scrollbar-thumb {
  background: #9f9f9f;
  border-radius: 10px;
  margin-bottom: -6px;
}

.product-tab::-webkit-scrollbar-thumb:hover,
.scroll-y::-webkit-scrollbar-thumb:hover {
  background: #9f9f9f;
  cursor: pointer;
  margin-bottom: -6px;
}
</style>
