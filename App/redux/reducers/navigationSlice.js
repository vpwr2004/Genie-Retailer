import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screens: []
}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        addScreen: (state, action) => {
            const index = state.screens.indexOf(action.payload);
            if (index === -1)
                state.screens.push(action.payload);
        },
        removeScreen: (state, action) => {
            const index = state.screens.indexOf(action.payload);
            if (index !== -1) {
                state.screens.splice(index, 1);
            }
        }
    }
});

export const { addScreen, removeScreen } = navigationSlice.actions;
export default navigationSlice.reducer;