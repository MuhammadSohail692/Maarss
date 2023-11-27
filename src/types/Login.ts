
export type LoginResponse = {
    data: Root;
    loading: boolean;
    error: string;
}

export type Root ={
    token:             string;
    user_email:        string;
    user_nicename:     string;
    user_display_name: string;
}