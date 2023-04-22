import React from 'react'
import { Button, Drawer, Space } from 'antd';
import FormModules from './FormModules';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { closeDrawer, closeEditionMode } from '../../../../store/form-modules/formModulesSlices';

const DrawerFormModules = () => {
    const { isDrawerOpen, isEdit } = useAppSelector(select => select.formModule)
    const dispatch = useAppDispatch()
    return (
        <>
            <Drawer
                title={isEdit ? 'Edicion de modulo' : 'Creacion de modulo'}
                placement={'right'}
                width={500}
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