import React, { useEffect, useState } from 'react';
import { Layout, notification, theme } from 'antd';
import './MainLayout.style.css';
import { LayoutCss } from './MainLayout.style';
import { getModules } from '../store/menus/thunks';
import { useAppDispatch, useAppSelector } from '../store/store';
import InternetConnectionAlert from '../components/internet-conection-alert/InternetConectionAlert';
import LoadingComponent from '../components/loading/LoadingComponent';
import useGetStatusConection from '../hooks/useGetStatusConection';
import { setStatusConection } from '../store/status-conection/statusConectionSlice';
import MenuComponent from '../components/menu/MenuComponent';
import MenuHeaderComponent from '../components/menu/MenuHeaderComponent';
import useGetMonitorSize from '../hooks/useGetMonitorSize';
import './MainLayout.style.css'

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { statusConection } = useGetStatusConection();
	const { isLoading } = useAppSelector(selector => selector.menu);
	const [collapsed, setCollapsed] = useState(false);
	const dispatch = useAppDispatch();
	const { isMobile } = useGetMonitorSize()
	const [scrollPosition, setScrollPosition] = useState(0);
	const {
		token: { colorBgContainer },
	} = theme.useToken();


	useEffect(() => {
		dispatch(setStatusConection({ statusConection }));
	}, [statusConection]);

	useEffect(() => {
		//todo: hacer transparente el header al hacer scroll
		const handleScroll = () => {
			setScrollPosition(window.scrollY);
		};
		dispatch(getModules());
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
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
								className={`header`}
								style={{ background: '#a40c4c', color: '#FFFFFF', height: '60px' }}
							>
								<MenuHeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
							</Header>
							<Content
								style={{
									height: `calc(100vh - ${60}px )`,
									overflowY: 'auto',
									padding: 25,
									margin: 0,
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
