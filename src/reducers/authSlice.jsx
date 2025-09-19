import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state,value){
        state.token=value.payload;
    },
    resetToken(state){
      state.token=null;
    }
  },
  },
  )

// Action creators are generated for each case reducer function
export const { setToken, resetToken  } = authSlice.actions

export default authSlice.reducer