import ReactPaginate from 'react-paginate';
import './App.css'
import TaskItem from './components/TaskItem'
import toast, { Toaster } from 'react-hot-toast';
import { useGetTasksQuery } from './feature/TaskApiSlice'
// Initialization for ES Users
import {
  Modal,
  Ripple,
  initTWE,
} from "tw-elements";
import CenteredModal from './components/CenteredModal';
import CreateTaskForm from './components/CreateTaskForm';
import ExportTask from './components/ExportTask';
import { Task } from './interface';
import { useEffect, useState } from 'react';
import Spinner from './components/Spinner';
function TasksPage() {
  const [page, setPage] = useState(1);
  const { data, refetch, isLoading } = useGetTasksQuery(page);
  useEffect(() => {
    refetch();
  }, [page]);

  initTWE({ Modal, Ripple });
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto">
        <div className='flex flex-wrap justify-between pb-4 items-center'>
          <h2 className="text-2xl font-bold sm:mb-0 mb-2">Task Manager</h2>
          <div className='flex flex-wrap gap-5'>
            <button
              type="button"
              className="inline-block sm:w-auto w-full rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
              data-twe-toggle="modal"
              data-twe-target="#newTaskModal"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              Add New Task
            </button>
            <button
              type="button"
              className="inline-block sm:w-auto w-full rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white"
              data-twe-toggle="modal"
              data-twe-target="#exportModal"
              data-twe-ripple-init
              data-twe-ripple-color="light">
              Export Task
            </button>
          </div>
        </div>
        <ul id="taskList" className="divide-y divide-gray-200">
          {
            data && data.data.map((task: Task) => (
              <TaskItem key={task.id} task={task} />
            ))
          }
          {
            data && data?.data.length < 1 && <p className='text-center my-3 text-lg'>No tasks available</p>
          }
          {
            isLoading && <Spinner/>
          }
        </ul>
        <div id="pagination" className="flex justify-between pt-6 pb-9 border-t px-5 border-t-[#EBEBEB]">
          <p className="text-[#13022D] IBMregular text-[14px]">
            Showing {data?.pagination.count} of {data?.pagination.total} results
          </p>
          <ReactPaginate
            pageCount={data?.pagination.total_pages ?? 0}
            pageRangeDisplayed={data?.pagination.per_page}
            marginPagesDisplayed={2}
            onPageChange={(page) => {
              console.log(page);

              setPage(page.selected + 1)
            }}
            containerClassName={'flex'}
            activeClassName={'text-white bg-blue-500 flex-center mr-1 IBMregular rounded'}
            activeLinkClassName='text-white'
            previousLabel={<i className="fa-solid fa-chevron-left px-2"></i>}
            nextLabel={<i className="fa-solid fa-chevron-right px-2"></i>}
            pageClassName='mx-1'
            pageLinkClassName='px-2 text-black '
            previousLinkClassName='color-primary'
            nextLinkClassName='color-primary'
          />
        </div>
        <CenteredModal content={<CreateTaskForm />} modalId={'newTaskModal'} />
        <CenteredModal content={<ExportTask />} modalId={'exportModal'} />
      </div>
      <Toaster/>
      
    </>
  )
}

export default TasksPage;