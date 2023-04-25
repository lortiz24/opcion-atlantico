import { Action, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { startLoading, setModules, startMutation, stopMutation } from "./menuSlice";
import { IMenu } from "../../interfaces/modules-interface";
import { DispatchMessageService } from "../../components/message-response/DispatchMessageService";
import { closeDrawer, closeEditionMode } from "../form-modules/formModulesSlices";
import { menuController } from "../../controllers/menu/MenuControlller";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;

export const getModules = (): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startLoading());
        try {
            const modules = await menuController.getMenus({ order: true });
            dispatch(setModules({ modules }));
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    };
};

export const createModule = (newMenu: Omit<IMenu, 'id'>, call?: () => void): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startMutation());
        try {
            await menuController.createMenu(newMenu);
            dispatch(stopMutation());
            DispatchMessageService({ action: 'show', type: "success", msj: 'Se creo el modulo correctamente' })
        } catch (error) {
            dispatch(stopMutation());
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo crear el modulo' })
            console.error("Error getting documents: ", error);
        } finally {
            dispatch(closeDrawer())
        }
    };
};
export const updateModule = (menuId: string, newMenu: Omit<IMenu, 'id'>): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startMutation());
        try {
            await menuController.updateMenu(menuId, { id: menuId, ...newMenu });
            dispatch(stopMutation());
            DispatchMessageService({ action: 'show', type: "success", msj: 'Se actualizo el modulo correctamente' })
        } catch (error) {
            dispatch(stopMutation());
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se actualizar crear el modulo' })
            console.error("Error getting documents: ", error);
        } finally {
            dispatch(closeEditionMode())
        }
    };
};
export const deleteModule = (id_menu: string): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startMutation());
        try {
            await menuController.deleteMenu(id_menu);

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
            await menuController.inactiveMenu(menuId);

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
            await menuController.activeMenu(menuId);

            dispatch(stopMutation());

            DispatchMessageService({ action: 'show', type: "success", msj: 'Se activo correctamente el modulo' })

        } catch (error) {
            dispatch(stopMutation());

            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo activar el modulo' })

            console.error("Error getting documents: ", error);
        }
    };
};

