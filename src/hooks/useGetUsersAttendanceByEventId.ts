import React, { useEffect, useState } from 'react'
import { eventController } from '../controllers/events/event.controller'
import { IUserInfo } from '../interfaces/user-interfaces'

const useGetUsersAttendanceByEventId = (eventId: string) => {
    const [userAttendance, setuserAttendance] = useState<IUserInfo[]>([] as IUserInfo[])
    const [isLoading, setisLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        eventController.getUsersAttendanceByEventId(eventId)
            .then(userAttendance => {
                setuserAttendance(userAttendance as IUserInfo[])
                setisLoading(false)
            }).catch(error => {
                setError(error)
                setisLoading(false)
            })
    }, [eventId])

    return {
        userAttendance,
        isLoading,
        error
    }
}

export default useGetUsersAttendanceByEventId