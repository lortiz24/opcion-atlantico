import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Drawer, DrawerProps, Radio, RadioChangeEvent, Row, Space, theme } from 'antd';
import React, { useState } from 'react'
import FormModules from './FormModules';
import ListModules from './ListModules(deprecate)';





const DrawerFormModules = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };


    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                title="Drawer with extra actions"
                placement={'right'}
                width={500}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button type="primary" onClick={onClose}>
                            Ok
                        </Button>
                    </Space>
                }
            >
                <FormModules />
            </Drawer>
            <Space style={{ marginBottom: 20 }}>
                <Button icon={<PlusCircleFilled />} type="primary" onClick={showDrawer}>
                    Agregar modulo
                </Button>
            </Space>

        </>
    )
}

export default DrawerFormModules