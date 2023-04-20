import { Action, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { startLoading, setModules, startMutation, stopMutation } from "./menuSlice";
import { activeMenu, createMenus, deleteMenu, getMenus, inactiveMenu } from "../../firebase/menu/menu-services";
import { IModules } from "../../interfaces/modules-interface";
import { DispatchMessageService } from "../../components/message-response/DispatchMessageService";

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

export const createModule = (newMenu: Omit<IModules, 'id'>): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startMutation());
        try {
            await createMenus(newMenu);
            dispatch(stopMutation());
            DispatchMessageService({ action: 'show', type: "success", msj: 'Se creo el modulo correctamente' })
        } catch (error) {
            dispatch(stopMutation());
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo crear el modulo' })
            console.error("Error getting documents: ", error);
        }
    };
};
export const deleteModule = (id_menu: string): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startMutation());
        try {
            await deleteMenu(id_menu);

            dispatch(stopMutation());

            DispatchMessageService({ action: 'show', type: "success", msj: 'Se elimino correctamente el modulo' })
        } catch (error) {
            dispatch(stopMutation());

            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo eliminar el modulo' })

            console.error("Error getting documents: ", error);
        }
    };
};
export const inactiveModule = (menuId: string): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startMutation());
        try {
            await inactiveMenu(menuId);

            dispatch(stopMutation());

            DispatchMessageService({ action: 'show', type: "success", msj: 'Se inactivo correctamente el modulo' })

        } catch (error) {
            dispatch(stopMutation());

            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo inactivar el modulo' })

            console.error("Error getting documents: ", error);
        }
    };
};
export const activeModule = (menuId: string): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startMutation());
        try {
            await activeMenu(menuId);

            dispatch(stopMutation());

            DispatchMessageService({ action: 'show', type: "success", msj: 'Se activo correctamente el modulo' })

        } catch (error) {
            dispatch(stopMutation());

            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo activar el modulo' })

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

