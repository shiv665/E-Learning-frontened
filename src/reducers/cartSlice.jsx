import { createSlice } from '@reduxjs/toolkit'
import {toast} from 'react-hot-toast';

const initialState = {
  totalItems: localStorage.getItem("totalItems")?JSON.parse(localStorage.getItem("totalItems")):0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    settotalItems(state,value){
        state.totalItems=value.payload;
    }
    //add to cart , remove from cart and many more
     
    
  },
  },
  )

// Action creators are generated for each case reducer function
export const { settotalItems  } = cartSlice.actions

export default cartSlice.reducer