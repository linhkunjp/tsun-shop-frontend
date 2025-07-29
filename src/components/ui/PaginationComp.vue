<template>
  <div v-if="totalPages > 1" class="flex justify-start gap-3 mt-5">
    <button v-if="currentPage !== 1" @click="goToPage(currentPage - 1)">
      <i class="fa-solid fa-angles-left"></i>
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="goToPage(page)"
      :class="{ '!text-white !bg-black !border-black': currentPage === page }"
    >
      {{ page }}
    </button>

    <button v-if="currentPage < totalPages" @click="goToPage(currentPage + 1)">
      <i class="fa-solid fa-angles-right"></i>
    </button>
  </div>
</template>
<script lang="ts">
import { ref, computed, watch } from 'vue'
import deviceMixin from '@/utils/deviceMixin'

import { useCollectionStore } from '@/stores/collection'

export default {
  name: 'PaginationComp',
  mixins: [deviceMixin],
  props: {
    totalItems: {
      type: Number,
      default: 100,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
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
    const collectionStore = useCollectionStore()

    const currentPage = ref(1)
    const totalPages = computed(() => props.dataPageInfo?.totalPages || 0)

    async function goToPage(page: number) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
        props.onPageChange(page)
      }
    }

    // Hiển thị số trang khi quá dài
    const visiblePages = computed(() => {
      const total = totalPages.value
      const current = currentPage.value
      const range = []

      // 2 page trước, sau currentPage
      let start = Math.max(1, current - 2)
      let end = Math.min(total, current + 2)

      if (current <= 3) {
        end = Math.min(5, total)
      } else if (current >= total - 2) {
        start = Math.max(total - 4, 1)
      }

      for (let i = start; i <= end; i++) {
        range.push(i)
      }

      return range
    })

    // Emit giá trị currentPage khi slug thay đổi
    watch(
      () => props.slug,
      (newSlug) => {
        if (newSlug) {
          currentPage.value = 1
          emit('update:page', currentPage.value)
        }
      },
    )

    return {
      isMobile,
      currentPage,
      totalPages,
      goToPage,
      visiblePages,
    }
  },
}
</script>

<style scoped>
button {
  cursor: pointer;
  color: #333e48;
  background-color: #fff;
  border: 1px solid #e1e1e1;
  width: 35px;
  height: 35px;
}

button:hover {
  color: white;
  background-color: #000;
  border-color: #000;
}
</style>
