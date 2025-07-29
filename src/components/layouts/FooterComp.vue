<template>
  <div :class="!isDesktop ? '!mb-18' : '!mb-5'" class="h-full !mt-auto flex-1">
    <!-- Infor -->
    <div>
      <!-- Top -->
      <div
        v-if="isMobile"
        @click="isMoreInfo = !isMoreInfo"
        :class="{
          'border-b border-[#313739]': isMobile,
        }"
        class="bg-[#232323] !py-[20px] !px-[15px] text-center cursor-pointer"
      >
        <span class="text-white !text-[18px] font-semibold"
          >Thông tin khác
          <i
            :class="{ 'rotate-180': isMoreInfo }"
            class="fa fa-angle-up tsun-transition-arrow !ml-2"
          ></i
        ></span>
      </div>

      <!-- Main -->
      <transition @before-enter="beforeEnterBlock" @enter="enterBlock" @leave="leaveBlock">
        <div
          v-show="isMoreInfo || !isMobile"
          :ref="(el) => setRefs(el, 0)"
          class="overflow-hidden transition-[max-height,opacity] ease-in-out bg-[#232323]"
        >
          <div
            :class="
              isDesktop
                ? 'grid-cols-12 !mx-auto gap-2'
                : isTablet
                  ? 'grid-cols-2 !mx-auto gap-6'
                  : '!py-0'
            "
            class="text-[#9f9f9f] py-[40px] grid container"
          >
            <div
              v-for="(item, index) in accordions"
              :key="index"
              :class="{
                '!col-span-2': index == 1 && isDesktop,
                '!col-span-4': index == 0 && isDesktop,
                '!col-span-1': !isDesktop,
                'border-b border-[#313739] !mx-4': isMobile,
                '!border-0 !mb-0 !mx-0': index == 3,
              }"
              class="col-span-3"
            >
              <p
                @click="openInfo(index)"
                :class="{
                  '!uppercase': index == 0 || isMobile,
                  '!text-sm !pb-[14px] !pt-3 cursor-pointer': isMobile,
                  '!mb-[20px]': !isMobile,
                  '!text-white': isOpenInfo[index] || !isMobile,
                }"
                class="text-[20px] !font-medium flex justify-between items-center"
              >
                {{ item.title }}
                <i
                  v-if="isMobile && item.content"
                  :class="{ 'rotate-180': isOpenInfo[index] }"
                  class="fa fa-angle-up tsun-transition-arrow !ml-2 transition-transform duration-300"
                ></i>
              </p>
              <transition @before-enter="beforeEnterItem" @enter="enterItem" @leave="leaveItem">
                <ul
                  v-if="isOpenInfo[index] || !isMobile"
                  :ref="(el) => setRefs(el, index)"
                  class="overflow-hidden transition-[max-height,opacity] ease-in-out"
                  :class="{ '!pb-3': isMobile }"
                >
                  <li v-for="i in item.content" :key="i" class="text-[#9f9f9f] text-sm !mb-1.5">
                    {{ i }}
                  </li>
                  <img v-if="index === 0" :src="img" class="max-w-[230px] !mt-3 !mb-1.5" />
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Copyright -->
    <div class="!py-[20px] text-[#9f9f9f] !text-sm bg-black text-center">
      Copyright © 2025 tsunsg. Powered by Haravan
    </div>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import deviceMixin from '@/utils/deviceMixin'
import img from '@/assets/img/logo2.jpg'

export default {
  name: 'FooterComp',
  mixins: [deviceMixin],

  setup() {
    const isMobile = ref(false)
    const isTablet = ref(false)
    const isDesktop = ref(false)
    const isMoreInfo = ref(false)

    const accordions = [
      {
        title: 'Hộ kinh doanh tsun',
        content: [
          'Giấy chứng nhận ĐKKD số 41O8035777 do UBND Bình Thạnh cấp lần đầu ngày 28/02/2018',
          'Địa chỉ:350 Điện Biên Phủ, phường 17, Hồ Chí Minh',
          'Email: tsunsg@gmail.com',
          'Hotline: 093 407 6342',
        ],
        img: '',
      },
      {
        title: 'Liên kết',
        content: [
          'Chính sách bảo mật',
          'Hướng dẫn mua hàng',
          'Chính sách đổi trả',
          'Hướng dẫn thanh toán',
          'Chính sách vận chuyển',
          'Chính sách kiểm hàng',
        ],
        img: '',
      },
      {
        title: 'Thông tin liên hệ',
        content: [
          '* FLAGSHIP STORE: 26 Trần Quang Diệu, phường 14, quận 3',
          '* Đồng Nai: 47 Dương Tử Giang, phường Tân Tiến, TP. Biên Hoà',
          'https://www.facebook.com/TSUN.SG',
          '093 407 6342',
          'tsunsg@gmail.com',
        ],
        img: '',
      },
      { title: 'Fanpage' },
    ]

    const isOpenInfo = ref<boolean[]>(new Array(accordions.length).fill(false))

    const contentRefs = ref<(HTMLElement | null)[]>([])

    function openInfo(index: number) {
      isOpenInfo.value[index] = !isOpenInfo.value[index]
    }

    function setRefs(el: Element | ComponentPublicInstance | null, index: number) {
      if (isOpenInfo.value[index]) {
        contentRefs.value[index] = el as HTMLElement
      }
    }

    // CHO UL (accordion con)
    function beforeEnterItem(el: Element) {
      if (isMobile.value) {
        const target = el as HTMLElement
        target.style.maxHeight = '0'
      }
    }

    function enterItem(el: Element) {
      if (isMobile.value) {
        const target = el as HTMLElement
        target.style.transition = 'max-height 0.4s ease'
        target.style.maxHeight = target.scrollHeight + 'px'
      }
    }

    function leaveItem(el: Element, done: () => void) {
      if (isMobile.value) {
        const target = el as HTMLElement
        target.style.transition = 'opacity 0.3s ease, max-height 0.4s ease'
        target.style.maxHeight = '0'
        target.style.opacity = '1'
        requestAnimationFrame(() => {
          target.style.opacity = '0'
        })
        setTimeout(done, 400)
      }
    }

    // CHO DIV CHA
    function beforeEnterBlock(el: Element) {
      const target = el as HTMLElement
      target.style.maxHeight = '0'
    }

    function enterBlock(el: Element) {
      const target = el as HTMLElement
      target.style.transition = 'max-height 0.4s ease'
      target.style.maxHeight = target.scrollHeight + 'px'

      // Gỡ max-height sau khi hoàn tất để layout co giãn tự nhiên
      setTimeout(() => {
        target.style.maxHeight = ''
      }, 400) // khớp với thời gian transition
    }

    function leaveBlock(el: Element, done: () => void) {
      const target = el as HTMLElement
      // 👉 Reset về chiều cao thật để transition mượt từ đó về 0
      target.style.maxHeight = target.scrollHeight + 'px'

      // 👉 Cần 1 frame để trình duyệt apply maxHeight trước khi transition về 0
      requestAnimationFrame(() => {
        target.style.transition = 'max-height 0.4s ease'
        target.style.maxHeight = '0'
      })

      setTimeout(done, 400) // ⏱ khớp thời gian transition
    }

    onMounted(() => {
      let timer: any = null
      window.addEventListener('resize', () => {
        document.body.classList.add('resizing')
        clearTimeout(timer)
        timer = setTimeout(() => {
          document.body.classList.remove('resizing')
        }, 200)
      })
    })

    return {
      isMobile,
      isTablet,
      isDesktop,
      isMoreInfo,
      isOpenInfo,
      accordions,
      openInfo,
      img,
      setRefs,
      beforeEnterItem,
      enterItem,
      leaveItem,
      beforeEnterBlock,
      enterBlock,
      leaveBlock,
    }
  },
}
</script>

<style scoped>
.slide-toggle-enter-active,
.slide-toggle-leave-active {
  transition: max-height 0.4s ease;
  overflow: hidden;
}

.slide-toggle-enter-from,
.slide-toggle-leave-to {
  max-height: 0;
}

.slide-toggle-enter-to,
.slide-toggle-leave-from {
  max-height: 640px;
}
</style>
