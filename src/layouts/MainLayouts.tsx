import React, { useEffect, useState } from 'react';
import * as IconsAntDesing from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import { Layout, theme } from 'antd';
import './MainLayout.style.css';
import { LayoutCss } from './MainLayout.style';
import { getModules } from '../store/menus/thunks';
import { useAppDispatch, useAppSelector } from '../store/store';
import InternetConnectionAlert from '../components/internet-conection-alert/InternetConectionAlert';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../components/loading/LoadingComponent';
import useGetStatusConection from '../hooks/useGetStatusConection';
import { setStatusConection } from '../store/status-conection/statusConectionSlice';
import MenuComponent from '../components/menu/MenuComponent';
import { startLogout } from '../store/auth';
const { Header, Content, Sider } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { statusConection } = useGetStatusConection();
	const { isLoading } = useAppSelector(selector => selector.menu);
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
										<Button type='primary' onClick={onLogout}>Cerrar sesion</Button>
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
