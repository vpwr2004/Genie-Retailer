// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileNumber:"",
  storeName:"",
  storeOwnerName:"",
  panCard:"",
  storeService:"",
  storeLocation:"",
  storeDescription:"",
  storeImage:"",
  storeCategory:"",
  images: [],
  userDetails: [],
  authData:"",
};

const storeDataSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setMobileNumber: (state, action) => {
      state.mobileNumber = action.payload;
    },
    setStoreName: (state, action) => {
      state.storeName = action.payload;
    },
    setStoreOwnerName: (state, action) => {
      state.storeOwnerName = action.payload;
    },
    setPanCard: (state, action) => {
      state.panCard = action.payload;
    },
    setStoreService: (state, action) => {
      state.storeService = action.payload;
    },
    setStoreLocation: (state, action) => {
      state.storeLocation = action.payload;
    },
    setStoreCategory: (state, action) => {
      state.storeCategory = action.payload;
    },
    setStoreDescription: (state, action) => {
      state.storeDescription = action.payload;
    },
    setImages: (state, action) => {
      state.images.push(action.payload);
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
  
  },
});

export const { setMobileNumber ,setStoreName,setStoreOwnerName,setPanCard,setStoreService,setStoreLocation,setStoreCategory,setStoreDescription,setImages,setUserDetails,setAuthData} = storeDataSlice.actions;
export default storeDataSlice.reducer;
