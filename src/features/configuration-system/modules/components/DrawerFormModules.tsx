import React from 'react'
import { Button, Drawer, Space } from 'antd';
import FormModules from './FormModules';

interface IDrawerFormModulesProps {
    onClose: () => void;
    open: boolean;
    showDrawer: () => void;
    isEdit: boolean
    moduleId: string
}


const DrawerFormModules = ({ onClose, open, showDrawer, isEdit, moduleId }: IDrawerFormModulesProps) => {

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
                <FormModules isEdit={isEdit} moduleId={moduleId} onClose={onClose}/>
            </Drawer>

        </>
    )
}

export default DrawerFormModules