import React from 'react'
import { Button, Drawer, DrawerProps, Space } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { closeDrawerEvent } from '../../../../store/form-events/formEventSlice'
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize'
import EventForm from './EventForm'
import { IEvent, IFormEvent } from '../../../../interfaces/events-interfaces'
import { eventController } from '../../../../controllers/events/event.controller'
import { Timestamp } from 'firebase/firestore'
import { createEventAsync } from '../../../../store/form-events/event-thunk'

interface IDrawerEventFormProps extends DrawerProps {

}
const DrawerEventForm = ({ placement = 'right', width }: IDrawerEventFormProps) => {
    const { isDrawerEventOpen, isEditFormEvent } = useAppSelector(selector => selector.formEvent)
    const { width: widthMonitor } = useGetMonitorSize()
    const dispatch = useAppDispatch()

    const onCreateEvent = async (formEvent: IFormEvent) => {
        const newEvent: Omit<IEvent, 'id'> = {
            ...formEvent,
            dateStart: Timestamp.fromDate(formEvent.dateStart.toDate()),
            dateEnd: Timestamp.fromDate(formEvent.dateEnd.toDate()),
        }
        if(isEditFormEvent)return console.log('vales monda')
        dispatch(createEventAsync(newEvent))
    }

    return (
        <Drawer
            title={isEditFormEvent ? 'Edicion de evento' : 'Creacion de eventos'}
            placement={'right'}
            width={width ? width : widthMonitor < 900 ? '100%' : 900}
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