import { Drawer } from 'antd'
import React from 'react'
import MenuComponent, { IMenuComponentProps } from '../MenuComponent'
import useGetMonitorSize from '../../../hooks/useGetMonitorSize'

interface IMenuHeaderMobileComponentProps extends IMenuComponentProps {
    isCollapsed: boolean
}

const MenuMobileComponent = ({ setCollapsed, isCollapsed }: IMenuHeaderMobileComponentProps) => {
    const { windowSize: { width } } = useGetMonitorSize()
    return (
        <Drawer
        width={'80%'}
            closable={width < 390 ? true : false}
            placement='left'
            onClose={() => setCollapsed(true)}
            open={!isCollapsed}
        ><MenuComponent setCollapsed={setCollapsed} /></Drawer>
    )
}

export default MenuMobileComponent