import { Button, Drawer, DrawerProps, Space } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { closeDrawerEvent } from '../../../store/form-events/formEventSlice'
import FormModules from '../../configuration-system/modules/components/FormModules'
import useGetMonitorSize from '../../../hooks/useGetMonitorSize'

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
            <FormModules />
        </Drawer>

    )
}

export default DrawerEventForm