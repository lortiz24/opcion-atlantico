import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { getModules } from './thunks';


interface MenuState {
    page: number,
    modules: string[],
    isLoading: boolean,
    error: string | undefined
}
const initialState: MenuState = {
    page: 0,
    modules: ['Dashboard', 'Asistencia'],
    isLoading: false,
    error: undefined
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
            state.page = action.payload.page
            state.isLoading = false;
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
export const { setModules, startLoading } = menusSlice.actions;

export const selectMenus = (state: RootState) => state.menu
