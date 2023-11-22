
export interface IRegisterResponse {
    id:                 number;
    date_created:       Date;
    date_created_gmt:   Date;
    date_modified:      Date;
    date_modified_gmt:  Date;
    email:              string;
    first_name:         string;
    last_name:          string;
    role:               string;
    username:           string;
    billing:            Ing;
    shipping:           Ing;
    is_paying_customer: boolean;
    avatar_url:         string;
    meta_data:          MetaDatum[];
    _links:             Links;
}

export interface Links {
    self:       Collection[];
    collection: Collection[];
}

export interface Collection {
    href: string;
}

export interface Ing {
    first_name: string;
    last_name:  string;
    company:    string;
    address_1:  string;
    address_2:  string;
    city:       string;
    postcode:   string;
    country:    string;
    state:      string;
    email?:     string;
    phone:      string;
}

export interface MetaDatum {
    id:    number;
    key:   string;
    value: string;
}