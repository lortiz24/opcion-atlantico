import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getModules } from './thunks';
import { IModules } from '../../../interfaces/modules-interface';


interface MenuState {
    modules: IModules[],
    isLoading: boolean,
    error: string | undefined
    isMutation: boolean
}
const initialState: MenuState = {
    modules: [],
    isLoading: false,
    error: undefined,
    isMutation: false
}

export const menusSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        startLoading: (state, /* action */) => {
            state.isLoading = true;
        },
        setModules: (state, action) => {
            state.modules = action.payload.modules
            state.isLoading = false;
        },
        startMutation: (state, /* action */) => {
            state.isMutation = true;
        },
        stopMutation: (state, /* action */) => {
            state.isMutation = false;
        },

    },

});


// Action creators are generated for each case reducer function
export const { setModules, startLoading, startMutation, stopMutation } = menusSlice.actions;

export const selectMenus = (state: RootState) => state.menu