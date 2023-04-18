import { Tabs, Typography } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React from 'react'
import CreateModules from './components/CreateModules'

const ModulesView = () => {
    return (
        <>
            <Typography.Title level={4}>Configuracion de modulos</Typography.Title>
            <Tabs items={[
                {
                    label: 'Crear modules',
                    key: '1',
                    children: <CreateModules/>,
                },
                {
                    label: 'Tab 2',
                    key: '2',
                    children: 'Tab 2',
                },
                {
                    label: 'Tab 3',
                    key: '3',
                    children: <CreateModules/>,
                },
            ]} />

        </>
    )
}

export default ModulesView