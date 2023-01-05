import { createSlice } from '@reduxjs/toolkit'

export const videoSlice = createSlice({
  name: 'video',
  initialState: {
    value: null
  },
  reducers: {
    setVideoSlice: (state, action) => {
      console.log("리덕스 불렸넹?");
      state.value = action.payload;
      var a = document.createElement("a");
      a.href = action.payload;
      a.download = "AfterServicePlease";
      a.click();
      window.URL.revokeObjectURL(action.payload);
      a.remove();
      console.log(state.value);
    }
  }
})

// Action creators are generated for each case reducer function
export const {setVideoSlice } = videoSlice.actions

export default videoSlice.reducer