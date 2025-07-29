import { defineStore } from "pinia";

export const useSidebarStore = defineStore(
    "sidebar",
    {
        state: () => ({
            isOpen: false,
            component: '',
        }),
        actions: {
            openSidebar(v: boolean, c: string) {
                this.isOpen = v;
                this.component = c;
            },
        },
        getters: {
            getLabel(state) {
                switch (state.component) {
                    case "menu":
                        return "menu";
                    case "cart":
                        return "giỏ hàng";
                    default:
                        return "";
                }
            },
        },
    }
);

