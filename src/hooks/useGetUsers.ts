import React, { useEffect, useState } from 'react'
import { IUserInfo } from '../interfaces/user-interfaces'
import { userInfoController } from '../controllers/userInfo/user-info.controller'

const useGetUsers = () => {
    const [users, setUsers] = useState<IUserInfo[]>([])
    const [isLoadingUsers, setIsLoadingUsers] = useState(true)

    const getData = async () => {
        const users = await userInfoController.getUsersInfos()
        setIsLoadingUsers(false)
        if (users) setUsers(users)
    }

    useEffect(() => {
        getData()
    }, [])


    return {
        users,
        isLoadingUsers
    }
}

export default useGetUsers