
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
    id: number,
    field_work_id: number,
    name_sub_field: string,
    created_at: string,
    updated_at: string
}
