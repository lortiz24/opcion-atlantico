import React from 'react'
import { Avatar, Badge, Button, Col, Dropdown, Row, Space, Typography } from 'antd'
import * as IconsAntDesing from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { startLogout } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import useGetMonitorSize from '../../hooks/useGetMonitorSize';

interface IMenuHeaderComponentProps {
    collapsed: boolean;
    collapseButtonRef: React.RefObject<HTMLDivElement>
}

const MenuHeaderComponent = ({ collapsed, collapseButtonRef }: IMenuHeaderComponentProps) => {
    const { photoURL, displayName } = useAppSelector(selector => selector.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isMobile } = useGetMonitorSize()
    const onLogout = () => {
        dispatch(startLogout());
    }
    return (

        <Row justify={'space-between'} style={{ width: '100%' }}>
            <Col >
                <div ref={collapseButtonRef} style={{ cursor: 'pointer' }}>
                    {collapsed ? (
                        <IconsAntDesing.MenuUnfoldOutlined
                            style={{ fontSize: '24px' }}
                        />
                    ) : (
                        <IconsAntDesing.MenuFoldOutlined
                            style={{ fontSize: '24px' }}
                        />
                    )}
                </div>
            </Col>
            <Col>

                {((isMobile && collapsed) || !isMobile) && <Dropdown
                    children={
                        <Space >
                            <Avatar src={photoURL ? photoURL : 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/avatar-defecto.webp?alt=media&token=dc44ebc7-da97-4d93-8a03-c8f62103054e'} />{!isMobile ? <Typography.Text style={{ color: '#FFFFFF' }}>{displayName}</Typography.Text> : null}
                        </Space>}
                    menu={{
                        items: [{
                            key: '1',
                            label: <Badge count={'Pronto'} size='small' color='gold-inverse'><Space style={{ width: '100%', }}><Typography.Text>Mi perfil</Typography.Text></Space></Badge>,
                            icon: <IconsAntDesing.UserOutlined />,
                            onClick: () => navigate('/my-profile')
                        },
                        {
                            key: '2',
                            label: 'Mis eventos',
                            icon: <IconsAntDesing.CalendarOutlined />,
                            onClick: () => navigate('/events/my-events')
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
                }
            </Col>
        </Row>
    )
}

export default MenuHeaderComponent