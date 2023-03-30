import { Action, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { startLoading, setModules } from "./menuSlice";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export const getModules = (page = 0): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startLoading());
        // const { data } = await menuApi.get(`/pokemon?limit=10&offset=${10 * page}`)
        dispatch(setModules({ modules: ['hola', 'mundo'], page: 0 + 1 }));
    };
};


//Esto si queremos usar createAsyncThunk
/* export const getModules = createAsyncThunk(
    'menu/getModules',
    async () => {
        const response = await fetch(`/api/modules?page=${0}`);
        const data = await response.json();
        return { modules: ['Epaaa'] };
    }
); */

