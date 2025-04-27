
export const jsonParse = (data: string) => {
    return data ? JSON.parse(data) : []
}

export const urlApi = () => {
    return 'http://localhost:8000/api'
}
