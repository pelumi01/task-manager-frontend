import { apiSlice } from "../core/api-configuration/Index";
import { ErrorResponeInterface, TaskApiResponse, TaskApiResponseData } from "../interface";
import toast from "react-hot-toast";

export const FeesApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getTasks: builder.query<TaskApiResponseData, number>({
            query:(page) => ({
                url:`/tasks?page=${page}`,
                method:"GET",
            }),
            transformResponse: (response: TaskApiResponse): TaskApiResponseData => {
                return response.data;
            },

            transformErrorResponse: (response: ErrorResponeInterface) => {
                toast.error(response.data.message)
            },
        }),
        createTask: builder.mutation<any, any>({
            query:(body) => ({
                url:'/tasks',
                method:"POST",
                body:body
            }),
            transformResponse: (response: any): any => {
                return response.data;
            },

            transformErrorResponse: (response: any) => {
                if (response.status == 400 && response.data.code == 400) {
                    toast.error(response.data.message)
                } else {
                    toast.error('Request failed, Please try again');
                }
            },
        }),
        updateTask: builder.mutation<any, {body:{}, id:String}>({
            query:(payload) => ({
                url:`tasks/${payload.id}`,
                method:"PUT",
                body:payload.body
            }),
            transformResponse: (response: any): any => {
                return response.data;
            },

            transformErrorResponse: (response: any) => {
            },
        }),
        deletetTask: builder.mutation<any, string>({
            query:(id) => ({
                url:`tasks/${id}`,
                method:"DELETE",
            }),
            transformResponse: (response: any): any => {
                return response.data;
            },

            transformErrorResponse: (response: ErrorResponeInterface) => {
                toast.error(response.data.message)
            },
        }),

    })
});

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeletetTaskMutation,
} = FeesApiSlice;
