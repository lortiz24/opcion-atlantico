import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getModules } from './thunks';
import { IModules } from '../../../interfaces/modules-interface';


interface MenuState {
    modules: IModules[],
    isLoading: boolean,
    error: string | undefined
    isCreating: boolean
}
const initialState: MenuState = {
    modules: [],
    isLoading: false,
    error: undefined,
    isCreating: false
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
        startCreating: (state, /* action */) => {
            state.isCreating = true;
        },
        stopCreating: (state, /* action */) => {
            state.isCreating = false;
        },

    },
    /* 
    Esto es si hacemos los thunks con createAsyncThunk
    extraReducers: (builder) => {
        builder
            .addCase(getModules.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getModules.fulfilled, (state, action) => {
                state.modules = action.payload.modules;
            })
            .addCase(getModules.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
 */

});


// Action creators are generated for each case reducer function
export const { setModules, startLoading, startCreating, stopCreating } = menusSlice.actions;

export const selectMenus = (state: RootState) => state.menu
