export interface Task {
    id: string
    title: string
    is_completed: boolean
    description: string
    due_date: string
}
export interface TaskApiResponse {
    code:string
    data:TaskApiResponseData
    message:string
}
export interface TaskApiResponseData{
    data: Task[]
    pagination: {
        count: number
        current_page: number
        per_page: number
        total: number
        total_pages: number
    }
}
export interface ErrorResponeInterface {
    status: number
    data: {
        code: string;
        message: string;
    }
}