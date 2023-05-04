import { Avatar, Drawer, Space } from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../../../store/store'
import useGetMonitorSize from '../../../hooks/useGetMonitorSize'
import MenuList from './MenuList'

const MenuHeaderMobileComponent = () => {
    const [openMenuUser, setopenMenuUser] = useState(false)
    const { photoURL, displayName } = useAppSelector(selector => selector.auth)
    const { isMobile, isTable } = useGetMonitorSize()


    return (
        <>
            <Space >
                <Avatar src={photoURL ? photoURL : 'https://firebasestorage.googleapis.com/v0/b/opcion-atlantico.appspot.com/o/avatar-defecto.webp?alt=media&token=dc44ebc7-da97-4d93-8a03-c8f62103054e'}

                    onClick={() => setopenMenuUser(true)} />
            </Space>
            <Drawer
                title={displayName}
                width={'80%'}
                closable={false}
                placement='bottom'
                onClose={() => setopenMenuUser(false)}
                open={openMenuUser}
            ><MenuList setopenMenuUser={setopenMenuUser}/></Drawer>
        </>
    )
}

export default MenuHeaderMobileComponent