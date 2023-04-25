import React from 'react'
import { Avatar, Badge, Col, Dropdown, Row, Space, Typography } from 'antd'
import * as IconsAntDesing from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { startLogout } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

interface IMenuHeaderComponentProps {
    collapsed: boolean;
    setCollapsed: (value: React.SetStateAction<boolean>) => void
}

const MenuHeaderComponent = ({ collapsed, setCollapsed }: IMenuHeaderComponentProps) => {
    const { photoURL, displayName } = useAppSelector(selector => selector.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const onLogout = () => {
        dispatch(startLogout());
    }

    return (

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
                            label: <Badge count={'Pronto'} size='small' color='gold-inverse'><Space style={{ width: '100%', }}><Typography.Text>Mi perfil</Typography.Text></Space></Badge>,
                            icon: <IconsAntDesing.UserOutlined />,
                            onClick: () =>navigate('/my-profile')
                        },
                        {
                            key: '2',
                            label: 'Mis eventos',
                            icon: <IconsAntDesing.CalendarOutlined />,
                            onClick: () =>navigate('/events/my-events')
                        },
                        {
                            key: '3',
                            label: 'Cerrar sesion',
                            onClick: onLogout,
                            icon: <IconsAntDesing.LogoutOutlined />
                        },
                        ]
                    }}
                    placement="bottom"
                    arrow={{ pointAtCenter: true }}
                />

            </Col>
        </Row>
    )
}

export default MenuHeaderComponent