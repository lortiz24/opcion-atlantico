import { Col, Row, Typography } from 'antd'
import { LevelTitlesModules } from '../../../settings/properties-globals/levels-titles'
import ModulesList from './components/ModulesList'

const ModulesView = () => {
    return (
        <>
            <Typography.Title level={LevelTitlesModules}>Configuracion de modulos</Typography.Title>
            <br />
            <Row >
                <Col span={24}>
                    <ModulesList />
                </Col>
            </Row>



        </>
    )
}

export default ModulesView