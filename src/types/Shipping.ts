
export type ShippingResponse = {
    data: Root[];
    loading: boolean;
    error: string;
}

export type Root = {
    id:                 number;
    instance_id:        number;
    title:              string;
    order:              number;
    enabled:            boolean;
    method_id:          string;
    method_title:       string;
    method_description: string;
    settings:           Settings;
    _links:             Links;
}

export type Links ={
    self:       Collection[];
    collection: Collection[];
    describes:  Collection[];
}

export type Collection ={
    href: string;
}

export type Settings ={
    title:      Cost;
    tax_status: Cost;
    cost:       Cost;
}

export type Cost = {
    id:          string;
    label:       string;
    description: string;
    type:        string;
    value:       string;
    default:     string;
    tip:         string;
    placeholder: string;
    options?:    Options;
}

export type Options = {
    taxable: string;
    none:    string;
}