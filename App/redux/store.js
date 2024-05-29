// store.js
import { configureStore } from '@reduxjs/toolkit';
import storeDataSlice from './reducers/storeDataSlice.js';
import requestDataSlice from './reducers/requestDataSlice.js';
import bidSlice from './reducers/bidSlice.js';

 // Importing the correct reducer from counterSlice.js

const store = configureStore({
  reducer: {
    storeData: storeDataSlice, 
    requestData:requestDataSlice,
    bid:bidSlice,
    // Setting the reducer for 'storeData' slice
    // Add other reducers if needed
  },
});

export default store;
