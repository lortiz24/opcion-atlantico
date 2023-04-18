import { Card, Col, Row, Space, Tabs, Typography } from 'antd'
import DrawerFormModules from './components/DrawerFormModules'
import ListModules from './components/ListModules'

const ModulesView = () => {
    return (
        <>
            <Typography.Title level={4}>Configuracion de modulos</Typography.Title>
            <br />
            <Row >
                <Col span={24}>
                    <ListModules />
                </Col>
            </Row>



        </>
    )
}

export default ModulesView