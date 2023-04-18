import { Tabs, Typography } from 'antd'
import DrawerFormModules from './components/DrawerFormModules'

const ModulesView = () => {
    return (
        <>
            <Typography.Title level={4}>Configuracion de modulos</Typography.Title>
            <Tabs items={[
                {
                    label: 'Modulos',
                    key: '1',
                    children: <DrawerFormModules />,
                },
                {
                    label: 'Ordenar',
                    key: '2',
                    children: 'Tab 2',
                },
            ]} />

        </>
    )
}

export default ModulesView