export interface ISelectedProductRespose {
    product_id: number;
    quantity: number;
    variation_id: number;
    meta_data: Color[]
}

export interface Color {
    key:string,
    value:string
}