export interface VariantOption {
    value: string
    available: boolean
}

export interface Variants {
    title: string
    type: 'color' | 'size'
    options: VariantOption[]
}

export interface Tabs {
    name: string;
    content: string;
    images: string[];
}

export interface ProductItem {
    title: string
    pro_sale: string
    pro_price: string
    regular_price: string
    images: string[]
    url: string
    slug: string
    _id: string
}

export interface ProductDetail extends ProductItem {
    pro_sku: string
    variants: Variants[]
    isDisabled: boolean
    isContact: boolean
    breadcrumbs: string[]
    tabs: Tabs[];
}

export interface PageInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}


