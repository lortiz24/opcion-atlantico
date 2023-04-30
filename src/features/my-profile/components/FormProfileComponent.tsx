import React, { useEffect } from 'react';
import {
	EnvironmentOutlined,
	HomeOutlined,
	MailOutlined,
	TagsOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Row, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { IUserInfoForm } from '../../../interfaces/user-interfaces';
import { useAppSelector } from '../../../store/store';

interface IFormProfileComponentProps {
	onSubmitForm: (values: IUserInfoForm) => void;
}

const FormProfileComponent = ({ onSubmitForm }: IFormProfileComponentProps) => {
	const [form] = useForm<IUserInfoForm>();
	const { email, userInfo, isUpdateProfile, displayName } = useAppSelector(sel => sel.auth);
	const onSetData = (values: IUserInfoForm) => {
		Object.keys(values).forEach(key => {
			//@ts-ignore
			if (values[key] === undefined) values[key] = null;
		});
		onSubmitForm(values);
	};

	useEffect(() => {
		form.setFieldsValue({
			email: email ? email : '',
			rols: userInfo?.rols,
			displayName: displayName ?? undefined,
			promocion: userInfo?.promocion,
			gender: userInfo?.gender,
			city: userInfo?.city,
			address: userInfo?.address
		});
	}, []);

	return (
		<Form onFinish={onSetData} form={form}>
			<Form.Item
				name='displayName'
				rules={[
					{
						required: true,
						message: 'Por favor ingrese su nombre completo',
					},
				]}
			>
				<Input prefix={<UserOutlined />} placeholder='Nombre completo' />
			</Form.Item>
			<Form.Item name='gender'>
				<Select
					placeholder='Genero'
					options={[
						{
							label: 'Masculino',
							value: 'masculino',
						},
						{
							label: 'Femenino',
							value: 'femenino',
						},
						{
							label: 'Otro',
							value: 'other',
						},
					]}
				/>
			</Form.Item>
			<Form.Item name='email'>
				<Input prefix={<MailOutlined />} disabled />
			</Form.Item>
			<Form.Item name='city'>
				<Input prefix={<EnvironmentOutlined />} placeholder='Municipio' />
			</Form.Item>
			<Form.Item name='address'>
				<Input prefix={<HomeOutlined />} placeholder='Dirección' />
			</Form.Item>
			<Form.Item name='rols'>
				<Select disabled placeholder='Rol' mode='multiple' />
			</Form.Item>
			<Form.Item name='promocion'>
				<Input disabled prefix={<TagsOutlined />} placeholder='Promoción' />
			</Form.Item>
			<Form.Item>
				<Button loading={isUpdateProfile} type='primary' htmlType='submit'>
					Guardar
				</Button>
			</Form.Item>
		</Form>
	);
};

export default FormProfileComponent;
