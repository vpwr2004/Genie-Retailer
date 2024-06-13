
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
 bidDetails:"",
 bidImages:[],
 bidOfferedPrice:0,
 productWarranty:0,
 accept:false
};

const bidSlice = createSlice({
  name: 'bid',
  initialState,
  reducers: {
    
    
    setBidDetails: (state, action) => {
      state.bidDetails = action.payload;
    },
    setBidImages: (state, action) => {
        state.bidImages = action.payload;
      },
      setBidOfferedPrice: (state, action) => {
        state.bidOfferedPrice = action.payload;
      },
    setProductWarranty:(state,action)=>{
        state.productWarranty = action.payload;
      },
      setAccept:(state,action)=>{
        state.accept = action.payload;
      },
      bidClear: (state) => {
        return initialState;
      }
    
  
  },
});

export const { setBidDetails,setBidImages,setBidOfferedPrice,setProductWarranty,setAccept,bidClear } = bidSlice.actions;
export default bidSlice.reducer;
