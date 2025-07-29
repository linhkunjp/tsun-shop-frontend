<template>
  <div :class="dynamicClass" class="grid gap-8">
    <div v-for="(item, index) in data" :key="index">
      <ProdItem :index="index" :item="item" />
    </div>
  </div>

  <!-- Pagination -->
  <div class="!mt-[30px] !mb-[50px]">
    <PaginationComp
      :dataPageInfo="dataPageInfo"
      :slug="slug"
      :sortQuery="sortQuery"
      :onPageChange="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import type { ProductItem } from '@/types/product'

import deviceMixin from '@/utils/deviceMixin'
import ProdItem from '@/components/ui/product/ProdItem.vue'
import PaginationComp from '@/components/ui/PaginationComp.vue'

export default {
  name: 'ProdList',
  mixins: [deviceMixin],
  components: {
    ProdItem,
    PaginationComp,
  },
  props: {
    dynamicClass: Object,
    dataResults: {
      type: Array as PropType<ProductItem[]>,
      required: true,
    },
    dataPageInfo: Object,
    slug: String,
    sortQuery: String,
    onPageChange: {
      type: Function,
      required: true,
    },
  },

  setup(props, { emit }) {
    const isMobile = ref(false)
    const isDesktop = ref(false)

    const data = computed(() => props.dataResults || [])

    const handlePageChange = (newPage: number) => {
      props.onPageChange(newPage)
    }

    return {
      isMobile,
      isDesktop,
      data,
      handlePageChange,
    }
  },
}
</script>
