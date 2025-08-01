import { createRouter, createWebHistory } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import MainView from '@/views/MainView.vue'
const routes = [
  {
    path: '/',
    component: MainView,
    children:
      [
        {
          path: '/',
          component: () => import("@/views/pages/HomePage.vue"),
        },
        {
          path: '/collections/:slug?',
          component: () => import("@/views/pages/CollectionPage.vue"),

        },
        {
          path: '/products/:slug',
          component: () => import("@/views/pages/ProductPage.vue"),

        },
        {
          path: '/cart',
          component: () => import("@/views/pages/CartPage.vue"),

        },
        {
          path: '/search',
          component: () => import("@/views/pages/SearchPage.vue"),
        },
        {
          path: '/contact',
          component: () => import("@/views/pages/ContactPage.vue"),

        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import("@/views/pages/NotFound.vue"),

        },
        {
          path: "/auth",
          component: () => import("@/views/pages/AuthPage.vue"),
        },
      ]
  },

  {
    path: '/checkout',
    component: () => import('@/views/pages/CheckoutPage.vue'),
    meta: { requiresCart: true } // Truy cập được khi giỏ hàng có dữ liệu
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//  Chuyển hướng
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  const cartStore = useCartStore();

  // Chuyển về home nếu đã đăng nhập
  if (token && to.path === '/auth') {
    return next('/');
  }

  if (to.meta.requiresCart) {
    if (cartStore.cartQuantity == 0 && !cartStore.isCartFetched) {
      // Lấy dữ liệu giỏ hàng mỗi khi truy cập vào router /checkout
      cartStore.isCartFetched = true;
      cartStore.isLoading = true;
      await cartStore.getCart();
      cartStore.isLoading = false;
    }

    if (cartStore.cartQuantity == 0) {
      // console.log(cartStore.cartQuantity)
      return next('/cart');
    }
  }

  if (to.path === '/products' || to.path === '/collections') {
    next('/collections/all')
  } else {
    next()
  }
})

export default router
