import React from 'react'
import { useAppSelector } from '../../store/store'

const MyProfileView = () => {
    const { displayName, photoURL, uid, email, userInfo } = useAppSelector(selector => selector.auth)
    return (
        <div>MyProfileView</div>
    )
}

export default MyProfileView