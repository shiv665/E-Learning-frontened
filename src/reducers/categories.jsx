import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tags: localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setTags(state,value){
        state.tags=value.payload;
    },
    resetTags(state){
      state.tags=null;
    }
  },
},
  )

// Action creators are generated for each case reducer function
export const { setTags, resetTags  } = categorySlice.actions

export default categorySlice.reducer