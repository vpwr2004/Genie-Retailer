// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
  newRequests: [],
  ongoingRequests:[],
  messages:[],
  requestInfo:[],
};

const requestDataSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    
    
    setNewRequests: (state, action) => {
      state.newRequests = action.payload;
    },
    setOngoingRequests: (state, action) => {
        state.ongoingRequests = action.payload;
      },
      setMessages: (state, action) => {
        state.messages = action.payload;
      },
      setRequestInfo: (state, action) => {
        state.requestInfo = action.payload;
      },

  
  },
});

export const { setNewRequests,setOngoingRequests,setMessages,setRequestInfo} = requestDataSlice.actions;
export default requestDataSlice.reducer;
