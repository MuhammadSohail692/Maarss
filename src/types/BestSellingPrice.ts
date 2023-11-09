export type BestSellingProductRespose = {
    data: Root[];
    loading: boolean;
    error: string;
}

export type Root = {
    id: number;
    name: string;
    sku: string;
    price: string;
    categories: Category[];
    images: Image[];
    _links: Links;
}

export type Links = {
    self: Collection[];
    collection: Collection[];
}

export type Collection = {
    href: string;
}

export type Category = {
    id: number;
    name: string;
    slug: string;
}

export type Image = {
    id: number;
    date_created: Date;
    date_created_gmt: Date;
    date_modified: Date;
    date_modified_gmt: Date;
    src: string;
    name: string;
    alt: string;
}
