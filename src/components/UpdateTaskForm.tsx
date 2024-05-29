import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useUpdateTaskMutation } from "../feature/TaskApiSlice";
import { Task } from "../interface";

const UpdateTaskForm = ({ updateData }: { updateData: Task }) => {
    const [updateTask, { isLoading }] = useUpdateTaskMutation()
    const [formData, setFormdata] = useState({
        title: "",
        description: " ",
        due_date: "",
        is_completed:false
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let responsee = await updateTask({
            body:formData,
            id:updateData.id
        });
        if ("data" in responsee) {
            window.location.reload();
        }

    }
    useEffect(() => {
        setFormdata({
            title: updateData.title,
            description: updateData.description,
            due_date: updateData.due_date,
            is_completed:updateData.is_completed
        })

    }, [updateData]);
    return (
        <>
            <form id="TaskForm" className="mb-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2 text-left">Title</label>
                    <input type="text" id="title" name="title" onChange={(e) => handleChange(e)} value={formData.title} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></input>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2 text-left">Description</label>
                    <textarea id="description" name="description" onChange={(e) => handleChange(e)} value={formData.description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2 text-left">Due Date</label>
                    <input type="date" id="dueDate" name="due_date" onChange={(e) => handleChange(e)} value={formData.due_date} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={isLoading}>

                        {
                            isLoading ? "loading..." : "Update Task"
                        }
                    </button>
                </div>
            </form>
        </>
    );
}

export default UpdateTaskForm;