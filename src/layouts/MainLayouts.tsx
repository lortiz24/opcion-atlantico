import React, { useEffect, useState } from 'react';
import * as IconsAntDesing from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Row, Space, Typography } from 'antd';
import { Layout, theme } from 'antd';
import './MainLayout.style.css';
import { LayoutCss } from './MainLayout.style';
import { getModules } from '../store/menus/thunks';
import { useAppDispatch, useAppSelector } from '../store/store';
import InternetConnectionAlert from '../components/internet-conection-alert/InternetConectionAlert';
import LoadingComponent from '../components/loading/LoadingComponent';
import useGetStatusConection from '../hooks/useGetStatusConection';
import { setStatusConection } from '../store/status-conection/statusConectionSlice';
import MenuComponent from '../components/menu/MenuComponent';
import { startLogout } from '../store/auth';
const { Header, Content, Sider } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { statusConection } = useGetStatusConection();
	const { isLoading } = useAppSelector(selector => selector.menu);
	const { displayName, photoURL } = useAppSelector(selector => selector.auth);
	const [collapsed, setCollapsed] = useState(false);
	const dispatch = useAppDispatch();
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	useEffect(() => {
		dispatch(setStatusConection({ statusConection }));
	}, [statusConection]);

	useEffect(() => {
		dispatch(getModules());
	}, []);

	const onLogout = () => {
		dispatch(startLogout());
	}
	return (
		<>
			{isLoading ? (
				<LoadingComponent isLoading={isLoading} />
			) : (
				<Layout style={LayoutCss}>
					<InternetConnectionAlert />
					<Layout>
						<Sider
							style={{ background: colorBgContainer }}
							width={200}
							trigger={null}
							collapsible
							onCollapse={() => setCollapsed(!collapsed)}
							collapsed={collapsed}
						>
							<MenuComponent />
						</Sider>
						<Layout>
							<Header
								className='header'
								style={{ background: '#a40c4c', color: '#FFFFFF' }}
							>
								<Row justify={'space-between'} style={{ width: '100%' }}>
									<Col>
										{collapsed ? (
											<IconsAntDesing.MenuUnfoldOutlined
												style={{ fontSize: '24px' }}
												onClick={() => setCollapsed(!collapsed)}
											/>
										) : (
											<IconsAntDesing.MenuFoldOutlined
												style={{ fontSize: '24px' }}
												onClick={() => setCollapsed(!collapsed)}
											/>
										)}
									</Col>
									<Col>
										<Dropdown

											children={
												<Space >
													<Avatar src={photoURL ? photoURL : 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/avatar-defecto.webp?alt=media&token=dc44ebc7-da97-4d93-8a03-c8f62103054e'} /><Typography.Text style={{ color: '#FFFFFF' }}>{displayName}</Typography.Text>
												</Space>}
											menu={{
												items: [{
													key: '1',
													label: 'Mi perfil',
													icon: <IconsAntDesing.UserOutlined />
												},
												{
													key: '2',
													label: 'Mis eventos',
													icon: <IconsAntDesing.CalendarOutlined />
												},
												{
													key: '3',
													label: 'Cerrar sesion',
													onClick: onLogout,
													icon: <IconsAntDesing.LogoutOutlined />
												},
												]
											}}
											placement="bottomCenter"
											arrow={{ pointAtCenter: true }}
										/>

									</Col>
								</Row>
							</Header>
							<Content
								style={{
									overflow: 'auto',
									padding: 25,
									margin: 0,
									minHeight: 0,
									background: colorBgContainer,
								}}
							>
								{children}
							</Content>
						</Layout>
					</Layout>
				</Layout>
			)}
		</>
	);
};

export default MainLayout;
