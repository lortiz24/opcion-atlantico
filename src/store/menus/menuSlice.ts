import { createSlice } from '@reduxjs/toolkit';
import { IMenu } from '../../interfaces/modules-interface';
import { RootState } from '../store';


interface MenuState {
    modules: IMenu[],
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
        stopLoading: (state, /* action */) => {
            state.isLoading = false;
        },
        setModules: (state, action) => {
            state.modules = action.payload.modules
            state.isLoading = false;
        },
        startMutation: (state, /* action */) => {
            console.log('Iniciano mutacion')
            state.isMutation = true;
        },
        stopMutation: (state, /* action */) => {
            state.isMutation = false;
        },

    },

});


// Action creators are generated for each case reducer function
export const { setModules, startLoading, startMutation, stopMutation, stopLoading } = menusSlice.actions;

export const selectMenus = (state: RootState) => state.menu
