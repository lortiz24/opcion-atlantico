import React from 'react'
import { Button, Drawer, DrawerProps, Space } from 'antd'
import { useAppDispatch, useAppSelector } from '../../../../store/store'
import { closeDrawerEvent } from '../../../../store/form-events/formEventSlice'
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize'
import EventForm from './EventForm'

interface IDrawerEventFormProps extends DrawerProps {

}
const DrawerEventForm = ({ placement = 'right', width }: IDrawerEventFormProps) => {
    const { isDrawerEventOpen, isEditFormEvent } = useAppSelector(selector => selector.formEvent)
    const { width: widthMonitor } = useGetMonitorSize()
    const dispatch = useAppDispatch()
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
            <EventForm onSetValuesForm={console.log} titleButton='Crear evento'/>
        </Drawer>

    )
}

export default DrawerEventForm