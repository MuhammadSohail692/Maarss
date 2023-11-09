export type ProductDetailRespose = {
    data: Root[];
    loading: boolean;
    error: string;
}

export type Root = {
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
}

export type Attribute ={
    id:        number;
    name:      string;
    position:  number;
    visible:   boolean;
    variation: boolean;
    options:   string[];
}

export type Category ={
    id:   number;
    name: string;
    slug: string;
}

export type Image ={
    id:                number;
    date_created:      Date;
    date_created_gmt:  Date;
    date_modified:     Date;
    date_modified_gmt: Date;
    src:               string;
    name:              string;
    alt:               string;
}