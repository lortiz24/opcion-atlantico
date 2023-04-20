import { Menu, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { IModules } from '../../interfaces/modules-interface';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import * as IconsAntDesing from '@ant-design/icons';

const MenuComponent = () => {
	const [menuList, setMenuList] = useState<IModules[]>([]);
	const { isLoading, modules } = useAppSelector(selector => selector.menu);
	const navigate = useNavigate();


	const {
		token: { colorBgContainer },
	} = theme.useToken();



	useEffect(() => {
		const modulesEnabled = modules.filter(
			module => module.status !== 'not-avalible'
		);
		setMenuList(modulesEnabled);
	}, [modules]);

	return (
		<Menu
			mode='inline'
			defaultSelectedKeys={['1']}
			defaultOpenKeys={['sub1']}
			style={{ height: '100%', borderRight: 0,background:colorBgContainer }}
			items={menuList.map((module, index) => {
				const key = String(index + 1);
				let newModule: any = {
					key: `module${key}`,
					label: module.label,
					// @ts-ignore
					icon: React.createElement(IconsAntDesing[module.icon]),
					children: module.children?.map((children, indexChildren) => {
						const subKey = index * 4 + indexChildren + 1;
						return {
							key: subKey,
							label: children.label,
							onClick: () => navigate(`${module.path}/${children.path}`),
						};
					}),
				};
				if (!module.children) newModule.onClick = () => navigate(module.path);
				return newModule;
			})}
		/>
	);
};

export default MenuComponent;