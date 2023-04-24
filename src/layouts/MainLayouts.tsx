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
import MenuHeaderComponent from '../components/menu/MenuHeaderComponent';
import useGetMonitorSize from '../hooks/useGetMonitorSize';
const { Header, Content, Sider } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { statusConection } = useGetStatusConection();
	const { isLoading } = useAppSelector(selector => selector.menu);
	const [collapsed, setCollapsed] = useState(false);
	const dispatch = useAppDispatch();
	const { isMobile } = useGetMonitorSize()
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	useEffect(() => {
		dispatch(setStatusConection({ statusConection }));
	}, [statusConection]);

	useEffect(() => {
		dispatch(getModules());
	}, []);

	useEffect(() => {
		if (isMobile) setCollapsed(true)
	}, [isMobile])


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
							width={300}
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
								<MenuHeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
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
