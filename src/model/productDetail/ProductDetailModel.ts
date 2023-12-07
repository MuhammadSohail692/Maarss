
export interface IProductDetailRespose {
    id:                number;
    name:              string;
    sku:               string;
    price:             string;
    categories:        Category[];
    images:            Image[];
    description:       string;
    short_description: string;
    stock_status:      string;
    attributes:        Attribute[];
    stock_quantity: any
}

export interface Attribute {
    id:        number;
    name:      string;
    position:  number;
    visible:   boolean;
    variation: boolean;
    options:   string[];
}

export interface Category {
    id:   number;
    name: string;
    slug: string;
}

export interface Image {
    id:                number;
    date_created:      Date;
    date_created_gmt:  Date;
    date_modified:     Date;
    date_modified_gmt: Date;
    src:               string;
    name:              string;
    alt:               string;
}