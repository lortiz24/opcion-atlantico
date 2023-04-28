import React, { useEffect, useState } from 'react'
import { IUserInfo } from '../interfaces/user-interfaces';
import { eventController } from '../controllers/events/event.controller';


interface IuseListeningUsersCheckedByEventProps {
    eventId: string;
}
const useListeningUsersCheckedByEvent = ({ eventId }: IuseListeningUsersCheckedByEventProps) => {
    const [userInfoCheck, setModule] = useState<IUserInfo[]>([] as IUserInfo[]);
    const [loading, setLoading] = useState(true);

    console.log(userInfoCheck)
    const onSet = (modulesRealTime: IUserInfo[]) => {
        setModule(modulesRealTime)
        setLoading(false)
    }
    useEffect(() => {
        const unsubscribe = eventController.listeningUsersInfoCheck(eventId, onSet)
        return () => {
            unsubscribe()
        }
    }, [])

    return {
        loading,
        userInfoCheck
    }
}

export default useListeningUsersCheckedByEvent