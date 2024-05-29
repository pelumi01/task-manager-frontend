import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface TaskSlice {
  value: number
}

// Define the initial state using that type
const initialState: TaskSlice = {
  value: 0,
}

export const taskSlice = createSlice({
  name: 'Task',
  initialState,
  reducers: {
   
  },
})

export const {  } = taskSlice.actions


export default taskSlice.reducer