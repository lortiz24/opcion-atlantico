import React from 'react'
import { Button, Drawer, DrawerProps, Space } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { closeDrawerEvent } from '../../../../store/form-events/formEventSlice'
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize'
import EventForm from './FormEvent'
import { IEvent, IFormEvent } from '../../../../interfaces/events-interfaces'
import { Timestamp } from 'firebase/firestore'
import { createEventAsync } from '../../../../store/form-events/event-thunk'
import { storageController } from '../../../../controllers/storage/storage.controller'
import { DispatchMessageService } from '../../../../components/message-response/DispatchMessageService'

interface IDrawerEventFormProps extends DrawerProps {

}
const DrawerEventForm = ({ placement = 'right', width }: IDrawerEventFormProps) => {
    const { isDrawerEventOpen, isEditFormEvent } = useAppSelector(selector => selector.formEvent)
    const { isTable } = useGetMonitorSize()
    const dispatch = useAppDispatch()

    const onCreateEvent = async ({ imgForm, ...formEvent }: IFormEvent) => {
        const newEvent: Omit<IEvent, 'id'> = {
            ...formEvent,
            dateStart: Timestamp.fromDate(formEvent.dateStart.toDate()),
            dateEnd: Timestamp.fromDate(formEvent.dateEnd.toDate()),
        }
        let nameImage = undefined
        if (imgForm[0]) {
            //todo: validar si el nombre de la imagen ya existe y preguntar si desea reemplazar
            nameImage = await storageController.uploadImage(imgForm[0], 'events-image', imgForm[0].name)
            if (!nameImage) return DispatchMessageService({ action: 'show', type: 'error', msj: 'No se pudo subir la imagen, verifique nuevamente' })
        }
        delete newEvent.img
        newEvent.img = nameImage ?? ''
        if (isEditFormEvent) return console.log('vales monda')
        dispatch(createEventAsync(newEvent))
    }

    return (
        <Drawer
            title={isEditFormEvent ? 'Edicion de evento' : 'Creacion de eventos'}
            placement={'right'}
            width={isTable ? '100%' : '90%'}
            onClose={() => dispatch(closeDrawerEvent())}
            open={isDrawerEventOpen}
            extra={
                <Space>
                    <Button onClick={() => dispatch(closeDrawerEvent())}>Cancelar</Button>
                </Space>
            }
        >
            <EventForm onSetValuesForm={onCreateEvent} titleButton='Crear evento' />
        </Drawer>

    )
}

export default DrawerEventForm