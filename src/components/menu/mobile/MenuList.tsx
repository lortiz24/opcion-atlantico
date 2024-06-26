import React from 'react'
import * as IconsAntDesing from '@ant-design/icons'
import { Avatar, Button, Card, Col, List, Row, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store/store'
import { startLogout } from '../../../store/auth'
import MyGradiantBackground from '../../gradiant-bacground/MyGradiantBackground'


interface IMenuListProps {
    setopenMenuUser: React.Dispatch<React.SetStateAction<boolean>>
}


const MenuList = ({ setopenMenuUser }: IMenuListProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const onLogout = () => {
        dispatch(startLogout());
    }

    const menuUser = [{
        key: '1',
        label: 'Mi perfil',
        icon: <IconsAntDesing.UserOutlined />,
        onClick: () => {
            setopenMenuUser(false)
            navigate('/my-profile')
        }
    },
    {
        key: '2',
        label: 'Mis eventos',
        icon: <IconsAntDesing.CalendarOutlined />,
        onClick: () => {
            setopenMenuUser(false)
            navigate('/events/my-events')
        }
    },
    {
        key: '3',
        label: 'Cerrar sesion',
        onClick: onLogout,
        icon: <IconsAntDesing.LogoutOutlined />
    },
    ]
    return (
        <>

            <List
                grid={{
                    xs: 2,
                    sm: 2,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl: 2,
                }}
                dataSource={menuUser}
                renderItem={(menu) => (
                    <Card
                        onClick={menu.onClick}
                        hoverable
                        style={{
                            margin: 10,
                            height: 60,
                            cursor: 'default',
                            borderRadius: 16,
                            backgroundPosition: 'center',
                            position: 'relative',
                            zIndex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        bodyStyle={{
                            width: '100%',
                            padding: 10,
                            borderRadius: 15,
                            position: 'relative',
                            zIndex: 1,
                            height: '100%',
                        }}
                    >
                        <MyGradiantBackground colorLeft='#FAF9F7' colorRight='#E9BDCF' borderRadius='15px' />
                        <Space style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button size='large' type='text' icon={menu.icon}>{menu.label}</Button>
                        </Space>
                        {/* <Space >
                            {menu.icon}
                            <Typography.Title level={3}>{menu.label}</Typography.Title>
                        </Space> */}

                    </Card>
                )}
            />

        </>
    )
}

export default MenuList