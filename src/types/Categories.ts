
export type CategoriesResponse = {
    data: Root[];
    loading: boolean;
    error: string;
    pageData:Root[]
}

export type Root ={
    id:              number;
    name:            string;
    slug:            string;
    parent:          number;
    description:     string;
}