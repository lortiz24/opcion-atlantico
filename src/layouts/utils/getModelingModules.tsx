import React, { useEffect } from 'react';
import { MenuProps } from "antd";
import { NotificationOutlined } from '@ant-design/icons';

import { IModules } from "../../store/slices/menus/interface/modules-interface";

export const getModelingModules = (modules: IModules[] = []) => {
    const modelingModules: MenuProps['items'] = modules.map(
        (module, index) => {
            const key = String(index + 1);
            return {
                key: `module${key}`,
                icon: React.createElement('UserOutlined'),
                label: module.label,
                children: module.children.map((children, indexChildren) => {
                    const subKey = index * 4 + indexChildren + 1;
                    return {
                        key: subKey,
                        label: children,
                    }
                })
            };
        },
    );
    console.log(modelingModules)
    return modelingModules
}