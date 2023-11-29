
export type CouponResponse = {
    data: Root[];
    loading: boolean;
    error: string;
}

export type Root ={
    id:                          number;
    code:                        string;
    amount:                      string;
    status:                      string;
    date_created:                Date;
    date_created_gmt:            Date;
    date_modified:               Date;
    date_modified_gmt:           Date;
    discount_type:               string;
    description:                 string;
    date_expires:                Date;
    date_expires_gmt:            Date;
    usage_count:                 number;
    individual_use:              boolean;
    product_ids:                 any[];
    excluded_product_ids:        any[];
    usage_limit:                 null;
    usage_limit_per_user:        null;
    limit_usage_to_x_items:      null;
    free_shipping:               boolean;
    product_categories:          any[];
    excluded_product_categories: any[];
    exclude_sale_items:          boolean;
    minimum_amount:              string;
    maximum_amount:              string;
    email_restrictions:          any[];
    used_by:                     string[];
    meta_data:                   any[];
    _links:                      Links;
}

export type Links ={
    self:       Collection[];
    collection: Collection[];
}

export type Collection ={
    href: string;
}