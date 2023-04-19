import { Card, Col, Row, Space, Tabs, Typography } from 'antd'
import DrawerFormModules from './components/DrawerFormModules'
import ListModules from './components/ListModules'
import { LevelTitlesModules } from '../../../settings/properties-globals/levels-titles'

const ModulesView = () => {
    return (
        <>
            <Typography.Title level={LevelTitlesModules}>Configuracion de modulos</Typography.Title>
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