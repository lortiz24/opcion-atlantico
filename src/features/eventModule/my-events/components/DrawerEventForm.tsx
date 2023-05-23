import React from 'react'
import { Button, Drawer, DrawerProps, Space } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { closeDrawerEvent } from '../../../../store/form-events/formEventSlice'
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize'
import EventForm from './FormEvent'
import { IEvent, IFormEvent } from '../../../../interfaces/events-interfaces'
import { Timestamp } from 'firebase/firestore'
import { createEventAsync, updateEventAsync } from '../../../../store/form-events/event-thunk'
import { DispatchMessageService } from '../../../../components/message-response/DispatchMessageService'

interface IDrawerEventFormProps extends DrawerProps {

}
const DrawerEventForm = ({ placement = 'right', width }: IDrawerEventFormProps) => {
    const { uid } = useAppSelector(selector => selector.auth)
    const { isDrawerEventOpen, isEditFormEvent, eventId } = useAppSelector(selector => selector.formEvent)
    const { isTable } = useGetMonitorSize()
    const dispatch = useAppDispatch()


    const onCreateEvent = async ({ dateStart, timeStart, dateEnd, timeEnd, imgForm, ...formEvent }: IFormEvent) => {
        if (!uid) return DispatchMessageService({ action: 'show', msj: 'No puede crear eventos si no esta autenticado' })

        let moderators: string[] = [];

        if (formEvent.moderators) {
            moderators = formEvent?.moderators?.includes(uid ?? '') ? formEvent.moderators : [...formEvent.moderators, uid]
        } else {
            moderators = [uid]
        }
        const newEvent: Omit<IEvent, 'id' | 'token'> = {
            ...formEvent,
            dateStart: Timestamp.fromDate(dateStart.hour(timeStart.hour()).minute(timeStart.second()).minute(timeStart.minute()).toDate()),
            dateEnd: Timestamp.fromDate(dateEnd.hour(timeEnd.hour()).minute(timeEnd.second()).minute(timeEnd.minute()).toDate()),
            anfitrion: uid,
            moderators,
            assistants: formEvent.assistants ?? [],
            status:'active'
        }
        if (isEditFormEvent) return dispatch(updateEventAsync(eventId, newEvent, imgForm))
        dispatch(createEventAsync(newEvent, imgForm))
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