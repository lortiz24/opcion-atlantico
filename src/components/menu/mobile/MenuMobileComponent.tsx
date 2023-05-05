import { Avatar, Card, Drawer, Space, Typography, theme } from 'antd'
import React from 'react'
import MenuComponent, { IMenuComponentProps } from '../MenuComponent'
import useGetMonitorSize from '../../../hooks/useGetMonitorSize'
import { useAppSelector } from '../../../store/store'

interface IMenuHeaderMobileComponentProps extends IMenuComponentProps {
    isCollapsed: boolean
}

const MenuMobileComponent = ({ setCollapsed, isCollapsed }: IMenuHeaderMobileComponentProps) => {
    const { windowSize: { width } } = useGetMonitorSize()
    const { displayName, photoURL } = useAppSelector(sel => sel.auth)
    return (
        <Drawer
            width={330}
            height={'100%'}
            closable={width < 390 ? true : false}
            placement='left'
            onClose={() => setCollapsed(true)}
            open={!isCollapsed}
        >
            <Card bordered style={{ border: `1px solid #a40c4c` }}>
                <Space >
                    <Avatar src={photoURL ? photoURL : 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/avatar-defecto.webp?alt=media&token=dc44ebc7-da97-4d93-8a03-c8f62103054e'}
                    />
                    <Typography.Title level={3}>{displayName}</Typography.Title>
                </Space>
            </Card>

            <Card bordered style={{ border: `1px solid #a40c4c`, marginTop: 10 }} >
                <MenuComponent setCollapsed={setCollapsed} />
            </Card>
        </Drawer>
    )
}

export default MenuMobileComponent