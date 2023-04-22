import { Button, Col, Row, Space, Typography } from 'antd';
import { LevelTitlesModules } from '../../../settings/properties-globals/levels-titles';
import ModulesList from './components/ModulesList';
import { PlusCircleFilled } from '@ant-design/icons';
import DrawerFormModules from './components/DrawerFormModules';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { openDrawer, restoreState } from '../../../store/form-modules/formModulesSlices';
import { useEffect } from 'react';

const ModulesView = () => {
	//store
	const { isDrawerOpen } = useAppSelector(selector => selector.formModule)
	const dispatch = useAppDispatch()

	useEffect(() => {
		return () => {
			dispatch(restoreState())
		}
	}, [])

	return (
		<>
			{isDrawerOpen && (
				<DrawerFormModules />
			)}
			<Typography.Title level={LevelTitlesModules}>
				Configuracion de modulos
			</Typography.Title>
			<br />
			<Row>
				<Col>
					<Space style={{ marginBottom: 20 }}>
						<Button
							icon={<PlusCircleFilled />}
							type='primary'
							onClick={() => dispatch(openDrawer())}
						>
							Agregar modulo
						</Button>
					</Space>
				</Col>
				<Col span={24}>
					<ModulesList />
				</Col>
			</Row>
		</>
	);
};

export default ModulesView;
