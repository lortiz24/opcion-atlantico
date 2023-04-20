import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Drawer, Space } from 'antd';
import React, { useState } from 'react'
import FormModules from './FormModules';
import { IModules } from '../../../../interfaces/modules-interface';
import useListeningModule from '../hooks/useListeningModule';
import useGetModule from '../hooks/useGetModule';


interface IDrawerFormModulesProps {
    onClose: () => void;
    open: boolean;
    showDrawer: () => void;
    isEdit: boolean
    moduleId: string
}


const DrawerFormModules = ({ onClose, open, showDrawer, isEdit, moduleId }: IDrawerFormModulesProps) => {
    const { loading, module } = useGetModule(moduleId)

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
                <FormModules isEdit={isEdit} moduleId={moduleId} />
            </Drawer>

        </>
    )
}

export default DrawerFormModules