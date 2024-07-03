// store.js
import { configureStore } from '@reduxjs/toolkit';
import storeDataSlice from './reducers/storeDataSlice.js';
import requestDataSlice from './reducers/requestDataSlice.js';
import bidSlice from './reducers/bidSlice.js';
import navigationSlice from './reducers/navigationSlice.js';

// Importing the correct reducer from counterSlice.js

const store = configureStore({
  reducer: {
    storeData: storeDataSlice,
    requestData: requestDataSlice,
    bid: bidSlice,
    navigation: navigationSlice,
    // Setting the reducer for 'storeData' slice
    // Add other reducers if needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
