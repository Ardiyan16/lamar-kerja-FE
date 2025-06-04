
export interface DashboardAdminTypes {
    count_user: number | string,
    count_company: number | string,
    count_post_job_active: number | string,
    count_post_job_all: number | string,
}

export interface typeIndustry {
    id: number,
    name_industry: string,
    created_at: string,
    updated_at: string
}

export interface fieldWorkTypes {
    id: number,
    field_name: string,
    created_at: string,
    updated_at: string
}

export interface subFieldWorkTypes {
    id: number | string,
    field_work_id: number | string,
    field_name: string,
    name_sub_field: string,
    created_at: string,
    updated_at: string
}

export interface socialMediaTypes {
    platform: string,
    link: string
}

export interface galleryTypes {
    index: string | number,
    name: string
}
