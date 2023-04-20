import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';


interface SessionState {
    uid: string | undefined;
    photoURL: string | null;
    displayName: string | null;
    isLoading: boolean,
    error: string | undefined
}
const initialState: SessionState = {
    uid: undefined,
    photoURL: null,
    displayName: null,
    isLoading: false,
    error: undefined,
}

export const sessionSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        startLoading: (state, /* action */) => {
            state.isLoading = true;
        },
        setSessionInfo: (state, action) => {
            state.uid = action.payload.uid
            state.photoURL = action.payload.photoURL
            state.displayName = action.payload.displayName
            state.isLoading = false;
        },
        setInitialState: (state, action) => {
            state = initialState
        }
    },

});


// Action creators are generated for each case reducer function
export const { setInitialState, setSessionInfo, startLoading } = sessionSlice.actions;

export const selectMenus = (state: RootState) => state.menu
