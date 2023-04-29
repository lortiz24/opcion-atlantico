import React, { useMemo } from 'react';
import { Form, Input, Button, Card, Row, Col, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './css/Login-css.css';
import opcion_logo from '../../assets/Logo Opcion Atlantico 2022.svg';
import Title from 'antd/es/typography/Title';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { startLoginWithEmailPassword } from '../../store/auth';
import LoadingComponent from '../../components/loading/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import { LayoutCss } from '../../layouts/MainLayout.style';

const LoginPages = () => {
	const dispatch = useAppDispatch();
	const { status } = useAppSelector(selector => selector.auth);
	const navigate = useNavigate();

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	return (
		<Layout className='login-page-container' style={LayoutCss}>
			<div className='container-left'>
				<div className='login-card-container'>
					<Card className='login-card'>
						<Row justify={'center'}>
							<Col>
								<img
									src={opcion_logo}
									height={300}
									alt='Logo'
									className='card-logo'
								/>
							</Col>
							<Col>
								<Title
									level={2}
									style={{
										color: '#1f3f50',
										fontWeight: 'bold',
										marginBottom: '20px',
									}}
								>
									Iniciar Sesión
								</Title>
								<Form
									name='login-form'
									initialValues={{ remember: true }}
									onFinish={values =>
										dispatch(
											startLoginWithEmailPassword({
												email: values.email,
												password: values.password,
											})
										)
									}
								>
									<Form.Item
										name='email'
										rules={[
											{
												required: true,
												message: 'Por favor ingresa tu correo institucional!',
											},
										]}
									>
										<Input
											prefix={<UserOutlined className='site-form-item-icon' />}
											placeholder='Correo institucional'
										/>
									</Form.Item>
									<Form.Item
										name='password'
										rules={[
											{
												required: true,
												message: 'Por favor ingresa tu contraseña!',
											},
										]}
									>
										<Input.Password
											prefix={<LockOutlined className='site-form-item-icon' />}
											type='password'
											placeholder='Contraseña'
										/>
									</Form.Item>
									<Form.Item>
										<Row justify={'center'} gutter={[8, 8]}>
											<Col>
												<Button
													type='primary'
													disabled={isAuthenticating}
													htmlType='submit'
													className='login-form-button'
												>
													Iniciar sesión
												</Button>
											</Col>
											<Col>
												<Button
													type='dashed'
													className='login-form-button'
													onClick={() => navigate('/auth/register')}
												>
													Registrarse
												</Button>
											</Col>
										</Row>
									</Form.Item>
								</Form>
							</Col>
						</Row>
					</Card>
				</div>
			</div>
			<div className='background-image-container'></div>
		</Layout>
	);
};

export default LoginPages;
