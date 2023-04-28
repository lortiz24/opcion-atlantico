import React from 'react'
import { Button, Drawer, Space } from 'antd';
import FormModules from './FormModules';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { closeDrawer, closeEditionMode } from '../../../../store/form-modules/formModulesSlices';
import useGetMonitorSize from '../../../../hooks/useGetMonitorSize';

const DrawerFormModules = () => {
    const { isDrawerOpen, isEdit } = useAppSelector(select => select.formModule)
    const dispatch = useAppDispatch()
    const { isTable } = useGetMonitorSize()
    return (
        <>
            <Drawer
                title={isEdit ? 'Edicion de modulo' : 'Creacion de modulo'}
                placement={'right'}
                width={isTable ? '100%' : '70%'}
                onClose={() => dispatch(closeEditionMode())}
                open={isDrawerOpen}
                extra={
                    <Space>
                        <Button onClick={() => dispatch(closeDrawer())}>Cancelar</Button>
                    </Space>
                }
            >
                <FormModules />
            </Drawer>

        </>
    )
}

export default DrawerFormModules