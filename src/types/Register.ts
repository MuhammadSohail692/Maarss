
export type RegisterResponse = {
    data: Root[];
    loading: boolean;
    error: string;
}

export type Root ={
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

export type Links ={
    self:       Collection[];
    collection: Collection[];
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
    postcode:   string;
    country:    string;
    state:      string;
    email?:     string;
    phone:      string;
}

export type MetaDatum ={
    id:    number;
    key:   string;
    value: string;
}