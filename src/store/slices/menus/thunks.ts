import { Action, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { startLoading, setModules, startCreating, stopCreating } from "./menuSlice";
import { modulesCollectionRef } from "../../../firebase/providers";
import { getDocs } from "firebase/firestore/lite";
import { createMenus, getMenus } from "../../../firebase/menu/menu-services";
import { IModules } from "../../../interfaces/modules-interface";
import { DispatchMessageService } from "../../../components/message-response/DispatchMessageService";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export const getModules = (): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startLoading());
        try {
            const modules = await getMenus();
            dispatch(setModules({ modules }));
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };
};

export const createModule = (newMenu: IModules): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startCreating());
        try {
            await createMenus(newMenu);
            dispatch(stopCreating());
            DispatchMessageService({ action: 'show', type: "success", msj: 'Se creo el modulo correctamente' })
            dispatch(getModules());
        } catch (error) {
            dispatch(stopCreating());
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo crear el modulo' })
            console.error("Error getting documents: ", error);
        }
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

