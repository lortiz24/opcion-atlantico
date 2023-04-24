import { Button, Drawer, Space } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { closeDrawerEvent } from '../../../store/form-events/formEventSlice'
import FormModules from '../../configuration-system/modules/components/FormModules'

const DrawerEventForm = () => {
    const { isDrawerEventOpen, isEditFormEvent } = useAppSelector(selector => selector.formEvent)
    const dispatch = useAppDispatch()
    return (
        <Drawer
            title={isEditFormEvent ? 'Edicion de evento' : 'Creacion de eventos'}
            placement={'right'}
            width={500}
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