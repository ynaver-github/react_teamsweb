import { configureStore } from '@reduxjs/toolkit'
import videoReducer from './slices/videoSlice'
import solutionReducer from './slices/solutionSlice'
export default configureStore({
  reducer: {
    video: videoReducer,
    solution: solutionReducer
  }
})