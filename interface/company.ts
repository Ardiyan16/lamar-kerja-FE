export interface CompanyProfileType {
    id: number,
    user_id: number,
    name: string,
    address: string | null,
    telp_number: string | null,
    type_industry: number | null,
    total_employee: string| null,
    about_us: string | null,
    corporate_culture: string |null,
    link: string | null,
    social_media: string | null,
    logo_profile: string | null,
    gallery: string | null,
    is_premium: number | null,
    created_at: string | null,
    updated_at: string | null,
}

export interface CompanyUserTypeJoin {
    users_id: number,
    username: string,
    email: string,
    email_verified_at: string,
    status: number,
    type: number,
    id: number,
    user_id: number,
    name: string,
    address: string | null,
    telp_number: string | null,
    type_industry: number | null,
    total_employee: string| null,
    about_us: string | null,
    corporate_culture: string |null,
    link: string | null,
    social_media: string | null,
    logo_profile: string | null,
    gallery: string | null,
    is_premium: number | null,
    created_at: string | null,
    updated_at: string | null,
}