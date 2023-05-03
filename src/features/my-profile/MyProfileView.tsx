import React from 'react';

import FormProfileComponent from './components/FormProfileComponent';
import { Avatar, Col, Row, Typography } from 'antd';
import { IUserInfo, IUserInfoForm } from '../../interfaces/user-interfaces';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { startUpdateUserProfile } from '../../store/auth';
const { Title } = Typography;



const MyProfileView = () => {
	const dispatch = useAppDispatch();
	const { uid, photoURL } = useAppSelector(sel => sel.auth);
	const onSubmitForm = (values: IUserInfoForm) => {
		const newUserInfo: IUserInfo = {
			...values,
			id: uid ? uid : '',
		};
		dispatch(startUpdateUserProfile(uid ? uid : '', newUserInfo));
	};

	return (
		<Row justify='center' style={{ marginTop: '3%' }}>
			<Col xs={22} md={12} lg={8}>
				<Row justify='center'>
					<Title level={1}>Editar Perfil</Title>
				</Row>
				<Row justify='center' style={{ marginBottom: '3%' }}>
					<Avatar
						size={150}
						src={photoURL?photoURL:'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/avatar-defecto.webp?alt=media&token=dc44ebc7-da97-4d93-8a03-c8f62103054e'}
					/>
				</Row>
			</Col>
			<Col xs={22} md={12} lg={8} style={{ marginRight: '50px' }}>
				<FormProfileComponent onSubmitForm={onSubmitForm} />
			</Col>
		</Row>
	);
};

export default MyProfileView;
