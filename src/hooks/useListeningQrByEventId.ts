import React, { useEffect, useState } from 'react'
import { eventController } from '../controllers/events/event.controller';

const useListeningQrByEventId = (eventId: string) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    const onSet = (token: string) => {
        setToken(token)
        setLoading(false)
    }
    useEffect(() => {
        const unsubscribe = eventController.listeningTokenEvent(eventId, onSet)

        return () => {
            unsubscribe()
        }
    }, [eventId])


    return {
        loading,
        token
    }
}

export default useListeningQrByEventId