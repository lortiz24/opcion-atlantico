import React from 'react';

import FormProfileComponent from './components/FormProfileComponent';
import { Avatar, Col, Row, Space, Typography } from 'antd';
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
		<Row justify='center' style={{ marginTop: '3%', height: '100vh', paddingBottom:20 }}>
			<Col xs={24} md={12} lg={8}>
				<Space style={{ display: 'flex', justifyContent: 'center' }}>
					<Title level={1}>Editar Perfil</Title>
				</Space>
				<Space style={{ display: 'flex', justifyContent: 'center' }}>
					<Avatar
						size={150}
						src={photoURL ? photoURL : 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/avatar-defecto.webp?alt=media&token=dc44ebc7-da97-4d93-8a03-c8f62103054e'}
					/>
				</Space>

			</Col>
			<Col xs={24} md={12} lg={8} >
				<FormProfileComponent onSubmitForm={onSubmitForm} />
			</Col>
		</Row>
	);
};

export default MyProfileView;
