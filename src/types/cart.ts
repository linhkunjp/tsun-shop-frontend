export interface Variant {
    size?: string
    color?: string
}

export interface DataCart {
    _id: string
    productId: string,
    title: string;
    variant?: Variant;
    quantity: number;
    price: string;
    image: string;
}

export interface DataCartAdd {
    productId: string,
    title: string;
    variant?: Variant;
    quantity: number;
    price: string;
    image: string;
}
