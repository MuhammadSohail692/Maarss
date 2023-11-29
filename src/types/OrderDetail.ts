export type OrderDetailResponse = {
    data: Root;
    loading: boolean;
    error: string;
}

export type Root ={
    id:                   number;
    parent_id:            number;
    status:               string;
    currency:             string;
    version:              string;
    prices_include_tax:   boolean;
    date_created:         Date;
    date_modified:        Date;
    discount_total:       string;
    discount_tax:         string;
    shipping_total:       string;
    shipping_tax:         string;
    cart_tax:             string;
    total:                string;
    total_tax:            string;
    customer_id:          number;
    order_key:            string;
    billing:              Ing;
    shipping:             Ing;
    payment_method:       string;
    payment_method_title: string;
    transaction_id:       string;
    customer_ip_address:  string;
    customer_user_agent:  string;
    created_via:          string;
    customer_note:        string;
    date_completed:       null;
    date_paid:            null;
    cart_hash:            string;
    number:               string;
    meta_data:            WelcomeMetaDatum[];
    line_items:           LineItem[];
    tax_lines:            any[];
    shipping_lines:       ShippingLine[];
    fee_lines:            any[];
    coupon_lines:         any[];
    refunds:              any[];
    payment_url:          string;
    is_editable:          boolean;
    needs_payment:        boolean;
    needs_processing:     boolean;
    date_created_gmt:     Date;
    date_modified_gmt:    Date;
    date_completed_gmt:   null;
    date_paid_gmt:        null;
    currency_symbol:      string;
    _links:               Links;
}

export type Links ={
    self:       Collection[];
    collection: Collection[];
    customer:   Collection[];
}

export type Collection ={
    href: string;
}

export type Ing ={
    first_name: string;
    last_name:  string;
    company:    string;
    address_1:  string;
    address_2:  string;
    city:       string;
    state:      string;
    postcode:   string;
    country:    string;
    email?:     string;
    phone:      string;
}

export type LineItem ={
    id:           number;
    name:         string;
    product_id:   number;
    variation_id: number;
    quantity:     number;
    tax_class:    string;
    subtotal:     string;
    subtotal_tax: string;
    total:        string;
    total_tax:    string;
    taxes:        any[];
    meta_data:    LineItemMetaDatum[];
    sku:          string;
    price:        number;
    image:        Image;
    parent_name:  string;
}

export type Image ={
    id:  number;
    src: string;
}

export type LineItemMetaDatum ={
    id:            number;
    key:           string;
    value:         string;
    display_key:   string;
    display_value: string;
}

export type WelcomeMetaDatum ={
    id:    number;
    key:   string;
    value: ValueClass | string;
}

export type ValueClass ={
    fbc?:              null;
    fbp?:              string;
    pys_landing?:      string;
    pys_source?:       string;
    pys_utm?:          string;
    pys_browser_time?: string;
    last_pys_landing?: string;
    last_pys_source?:  string;
    last_pys_utm?:     string;
    pys_utm_id?:       string;
    last_pys_utm_id?:  string;
}

export type ShippingLine ={
    id:           number;
    method_title: string;
    method_id:    string;
    instance_id:  string;
    total:        string;
    total_tax:    string;
    taxes:        any[];
    meta_data:    LineItemMetaDatum[];
}