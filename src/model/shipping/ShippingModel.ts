
export interface IShippingResponse {
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

export interface Links {
    self:       Collection[];
    collection: Collection[];
    describes:  Collection[];
}

export interface Collection {
    href: string;
}

export interface Settings {
    title:      Cost;
    tax_status: Cost;
    cost:       Cost;
}

export interface Cost {
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

export interface Options {
    taxable: string;
    none:    string;
}