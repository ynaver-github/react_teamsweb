import { createSlice } from '@reduxjs/toolkit'

export const solutionSlice = createSlice({
  name: 'solution',
  initialState: {
    value: 'no result'
  },
  reducers: {
    setSolutionSlice: (state, action) => {
      state.value = action.payload;
    } 
  }
})

// Action creators are generated for each case reducer function
export const { setSolutionSlice } = solutionSlice.actions

export default solutionSlice.reducer