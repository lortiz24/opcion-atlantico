import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { IMenu } from '../../interfaces/modules-interface';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import * as IconsAntDesing from '@ant-design/icons';
import useGetMonitorSize from '../../hooks/useGetMonitorSize';


export interface IMenuComponentProps {
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const MenuComponent = ({ setCollapsed }: IMenuComponentProps) => {
	const [menuList, setMenuList] = useState<IMenu[]>([]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const { modules } = useAppSelector(selector => selector.menu);
	const navigate = useNavigate();
	const { isMobile } = useGetMonitorSize()

	const handleOpenChange = (keys: string[]) => {
		setOpenKeys([keys.pop() || '']);
	};


	useEffect(() => {
		const modulesEnabled = modules.filter(
			module => module.status !== 'not-avalible'
		);
		setMenuList(modulesEnabled);
	}, [modules]);

	return (
		<Menu
			onOpenChange={handleOpenChange}
			openKeys={openKeys}
			mode='inline'
			defaultSelectedKeys={['1']}
			defaultOpenKeys={['sub1']}
			style={{ height: '100%', borderRight: 0 }}
			items={menuList.map((module, index) => {
				const key = String(index + 1);
				let iconeModule: any
				let newModule: any = {
					key: `module${key}`,
					label: module.label,
					title: module.label,
					// @ts-ignore
					icon: React.createElement(IconsAntDesing[module.icon] ?? IconsAntDesing.UnorderedListOutlined),

				};
				if (module.children.length > 0) {
					newModule.children = module.children.map((children, indexChildren) => {
						const subKey = index * 4 + indexChildren + 1;
						return {
							key: subKey,
							label: children.label,
							onClick: () => {
								if (isMobile)
									setCollapsed(true)
								navigate(`${module.path}/${children.path}`)
							},
						};
					})
				} else {
					newModule.onClick = () => {
						if (isMobile)
							setCollapsed(true)
						navigate(module.path)
					};
				}
				return newModule;
			})}
		>
		</Menu>
	);
};

export default MenuComponent;
