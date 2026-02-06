export interface Product {
    id: number | string;
    name: string;
    price: number;
    image: string;
    model?: string;
    color?: string;
    bg?: string; // background color for UI
    darkText?: boolean; // text color contrast
    title?: string; // for limited editions?
    tag?: string;
    [key: string]: any;
}

export interface CartItem extends Product {
    quantity: number;
    uniqueId?: number;
}
