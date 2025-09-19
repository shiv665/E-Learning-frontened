import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state,value){
        state.user=value.payload;
    },
    resetUser(state){
      state.user=null;
    }
  },
  },
  )

// Action creators are generated for each case reducer function
export const { setUser, resetUser  } = profileSlice.actions

export default profileSlice.reducer