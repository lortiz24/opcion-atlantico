import { Avatar, Drawer, Space, Typography } from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../../store/store'
import MenuList from './MenuList'
import useGetMonitorSize from '../../../hooks/useGetMonitorSize'

const MenuHeaderMobileComponent = () => {
    const [openMenuUser, setopenMenuUser] = useState(false)
    const { photoURL, displayName } = useAppSelector(selector => selector.auth)
    const { isMobile } = useGetMonitorSize()

    return (
        <>
            <Space onClick={() => setopenMenuUser(true)}>
                <Avatar src={photoURL ? photoURL : 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/avatar-defecto.webp?alt=media&token=dc44ebc7-da97-4d93-8a03-c8f62103054e'}

                />{!isMobile ? <Typography.Text style={{ color: '#FFFFFF' }}>{displayName}</Typography.Text> : null}
            </Space>
            <Drawer
                title={displayName}
                closable={false}
                placement='bottom'
                onClose={() => setopenMenuUser(false)}
                open={openMenuUser}
            ><MenuList setopenMenuUser={setopenMenuUser} /></Drawer>
        </>
    )
}

export default MenuHeaderMobileComponent