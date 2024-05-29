import { FormEvent } from "react";
import { useDeletetTaskMutation, useUpdateTaskMutation } from "../feature/TaskApiSlice";
import { Task } from "../interface";
import CenteredModal from "./CenteredModal";
import UpdateTaskForm from "./UpdateTaskForm";

const TaskItem = ({ task }: { task: Task }) => {
    const [deleteTask] = useDeletetTaskMutation();
    const [updateTask, { isLoading }] = useUpdateTaskMutation()

    const handleDelete = async (id: string) => {
        let response = await deleteTask(id);
        if ("data" in response) {
            window.location.reload();
        }
    }
    const handleIsCompleted = async (e: FormEvent) => {
        e.preventDefault();
        let responsee = await updateTask({
            body: {
                is_completed: !task.is_completed,
                title: task.title,
                description: task.description,
                due_date: task.due_date,
            },
            id: task.id
        });
        if ("data" in responsee) {
            window.location.reload();
        }
    }
    return (
        <>
            <li className="py-4 flex items-center justify-between border rounded-lg p-3 my-4">
                <div className='flex items-center gap-5'>
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={task.is_completed} onChange={handleIsCompleted} />
                    <div className='text-left'>
                        <div className={(task.is_completed &&  "line-through" )+" text-md font-semibold text-left"}>{task.title}</div>
                        <div className="flex gap-5 items-center">
                            <div className="text-gray-500 text-sm">{task.description}</div>
                            <div className="text-xs text-gray-400">Due: {task.due_date}</div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <i className="fa-solid fa-pen text-green-500 border p-2 rounded-md"
                        data-twe-toggle="modal"
                        data-twe-target={"#editModal" + task.id}
                    ></i>
                    <i className="fa-solid fa-trash text-red-500 border p-2 rounded-md" onClick={() => handleDelete(task.id)}></i>
                </div>
            </li>
            <CenteredModal
                content={<UpdateTaskForm updateData={task} />} modalId={"editModal" + task.id}
            />
        </>
    );
}

export default TaskItem;