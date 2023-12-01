export type SelectedProductRespose = {
    data: Root[];
    loading: boolean;
    error: string;
}

export type Root = {
    product_id: number;
    quantity: number;
    variation_id: number;
    meta_data: Color[]
}
export type Color ={
    key:string,
    value:string
}