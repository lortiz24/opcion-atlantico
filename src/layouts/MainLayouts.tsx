import React, { useEffect, useState } from 'react';
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
import MenuHeaderComponent from '../components/menu/MenuHeaderComponent';
import useGetMonitorSize from '../hooks/useGetMonitorSize';
import useIsCollapseMenu from '../components/menu/hooks/useIsCollapseMenu';
import * as IconsAntDesing from '@ant-design/icons';

const { Header, Content, Sider } = Layout;



const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { statusConection } = useGetStatusConection();
	const { isLoading } = useAppSelector(selector => selector.menu);
	const { userInfo } = useAppSelector(selec => selec.auth)
	const dispatch = useAppDispatch();
	const [scrollPosition, setScrollPosition] = useState(0);
	const { isCollapsed, setCollapsed, siderRef, collapseButtonRef } = useIsCollapseMenu()
	const { isMobile } = useGetMonitorSize()
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
		dispatch(getModules(userInfo));
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);


	const styleSidebarMobile = {
		position: 'fixed', zIndex: 1000, width: 300, height: '100%', background: colorBgContainer, display: isCollapsed ? 'none' : 'block'
	}

	const styleSidebarDesktop = {
		background: colorBgContainer
	}

	/* const getWidthHeader = () => {
		if (isMobile) {
			if (isCollapsed)
				return '100%'
			else
				return 300
		} else {
			if (isCollapsed) {
				return `calc(100% - ${80}px )`
			} else {
				return `calc(100% - ${300}px )`
			}
		}
	} */

	const getTriggers = () => {
		if (isMobile) {
			if (isCollapsed) {
				return (
					<IconsAntDesing.MenuUnfoldOutlined
						style={{ fontSize: '24px' }}
					/>
				)
			} else {
				return (
					<IconsAntDesing.MenuFoldOutlined
						style={{ fontSize: '24px' }}
					/>
				)
			}
		}
		return null
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
							style={isMobile ? styleSidebarMobile : styleSidebarDesktop}
							width={300}
							trigger={getTriggers()}
							collapsible
							onCollapse={(value) => setCollapsed(value)}
							collapsed={isCollapsed}
						>
							<MenuComponent setCollapsed={setCollapsed} />
						</Sider>
						<Layout >
							<Header
								className={`header`}
								style={{ background: '#a40c4c', color: '#FFFFFF', height: '60px', /* position: 'fixed', zIndex: 1000, width: getWidthHeader(), */ }}
							>
								<MenuHeaderComponent collapsed={isCollapsed} setCollapsed={setCollapsed} />
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
