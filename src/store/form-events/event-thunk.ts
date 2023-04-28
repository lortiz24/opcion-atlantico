import { Action, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { DispatchMessageService } from "../../components/message-response/DispatchMessageService";
import { IEvent, IImageEvent } from "../../interfaces/events-interfaces";
import { closeDrawerEvent, startActionEvent, stopActionEvent } from "./formEventSlice";
import { eventController } from "../../controllers/events/event.controller";
import { UploadFile } from "antd";
import { storageController } from "../../controllers/storage/storage.controller";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action<string>>;


export const createEventAsync = (newEvent: Omit<IEvent, 'id'>, imgForm: UploadFile<any>[]): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startActionEvent());
        try {
            let nameImage = undefined
            if (imgForm[0]) {
                nameImage = await storageController.uploadImage(imgForm[0], 'events-image', imgForm[0].name)
                if (!nameImage) return DispatchMessageService({ action: 'show', type: 'error', msj: 'No se pudo subir la imagen, verifique nuevamente' })
                newEvent.img = { url: nameImage, name: imgForm[0].name }
            } else {
                newEvent.img = null
            }

            newEvent.desciption = newEvent.desciption ?? ''
            const newEventId = await eventController.createEvent(newEvent);
            dispatch(stopActionEvent())
            if (!newEventId) return DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo crear el evento' })
            dispatch(closeDrawerEvent())
            DispatchMessageService({ action: 'show', type: "success", msj: 'Se creo el evento correctamente' })
        } catch (error) {
            dispatch(stopActionEvent())
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo crear el evento' })
            console.error("Error getting documents: ", error);
        }
    };
};
//todo: eliminar la imagen cuando se actualiza y se quita la imagen
export const updateEventAsync = (eventId: string, newEvent: Omit<IEvent, 'id'>, imgForm: UploadFile<any>[]): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startActionEvent());
        try {
            let nameImage = undefined
            if (imgForm[0] && imgForm[0].uid !== '-1') {
                nameImage = await storageController.uploadImage(imgForm[0], 'events-image', newEvent.img?.name ?? imgForm[0].name)
                if (!nameImage) return DispatchMessageService({ action: 'show', type: 'error', msj: 'No se pudo subir la imagen, verifique nuevamente' })
                const newImage: IImageEvent = { url: nameImage, name: imgForm[0].name }
                newEvent.img = newImage
            } else {
                if (imgForm.length === 0) {
                    newEvent.img = null
                }
            }


            const newEventId = await eventController.updateEvent(eventId, newEvent);
            if (newEventId.ok) {
                DispatchMessageService({ action: 'show', type: "success", msj: 'Se actualizo el evento correctamente' })
            }
            else {
                DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo actualizar el evento' })
            }

            dispatch(closeDrawerEvent())
        } catch (error) {
            dispatch(stopActionEvent())
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo crear el evento' })
            console.error("Error getting documents: ", error);
        }
    };
};

//todo: eliminar la imagen al eliminar un evento
export const deleteEventAsync = (id_menu: string): ThunkResult<void> => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(startActionEvent());
        try {
            await eventController.deleteEvent(id_menu);
            dispatch(stopActionEvent())
            DispatchMessageService({ action: 'show', type: "success", msj: 'Se elimino correctamente el evento' })
        } catch (error) {
            dispatch(stopActionEvent)
            DispatchMessageService({ action: 'show', type: "error", msj: 'No se pudo eliminar el evento' })
            console.error("Error getting documents: ", error);
        }
    };
};

