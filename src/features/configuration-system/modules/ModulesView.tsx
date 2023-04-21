import { Button, Col, Row, Space, Typography } from 'antd';
import { LevelTitlesModules } from '../../../settings/properties-globals/levels-titles';
import ModulesList from './components/ModulesList';
import { PlusCircleFilled } from '@ant-design/icons';
import { useState } from 'react';
import DrawerFormModules from './components/DrawerFormModules';
import { IModules } from '../../../interfaces/modules-interface';

const ModulesView = () => {
	const [open, setOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [moduleId, setModuleId] = useState('');
	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	const onSetIsEdit = (mooduleId: string) => {
		setIsEdit(true);
		setOpen(true);
        setModuleId(mooduleId)
	};
	return (
		<>
			{(open || isEdit) && (
				<DrawerFormModules
					moduleId={moduleId}
					isEdit={isEdit}
					open={open}
					showDrawer={showDrawer}
					onClose={onClose}
				/>
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
							onClick={showDrawer}
						>
							Agregar modulo
						</Button>
					</Space>
				</Col>
				<Col span={24}>
					<ModulesList onSetIsEdit={onSetIsEdit} setModuleId={setModuleId} />
				</Col>
			</Row>
		</>
	);
};

export default ModulesView;
