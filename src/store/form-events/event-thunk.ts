import { Action, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { DispatchMessageService } from "../../components/message-response/DispatchMessageService";
import { IEvent } from "../../interfaces/events-interfaces";
import { closeDrawerEvent, startActionEvent, stopActionEvent } from "./formEventSlice";
import { eventController } from "../../controllers/events/event.controller";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;


export const createEventAsync = (newEvent: Omit<IEvent, 'id'>): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startActionEvent());
        try {
            await eventController.createEvent(newEvent);
            DispatchMessageService({ action: 'show', type: "success", msj: 'Se creo el evento correctamente' })
            dispatch(closeDrawerEvent())
        } catch (error) {
            dispatch(stopActionEvent)
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo crear el evento' })
            console.error("Error getting documents: ", error);
        }
    };
};

/* export const updateEventAsync = (menuId: string, newMenu: Omit<IMenu, 'id'>): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startActionEvent());
        try {
            await eventController.updateEvent(menuId, { id: menuId, ...newMenu });
            DispatchMessageService({ action: 'show', type: "success", msj: 'Se actualizo el modulo correctamente' })
            dispatch(closeDrawerEvent())

        } catch (error) {
            dispatch(stopActionEvent())
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se actualizar crear el modulo' })
            console.error("Error getting documents: ", error);
        } finally {

        }
    };
};
export const deleteModule = (id_menu: string): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startActionEvent());
        try {
            await eventController.deleteEvent(id_menu);
            dispatch(stopActionEvent())
            DispatchMessageService({ action: 'show', type: "success", msj: 'Se elimino correctamente el modulo' })
        } catch (error) {
            dispatch(stopActionEvent)
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo eliminar el modulo' })
            console.error("Error getting documents: ", error);
        }
    };
}; */

