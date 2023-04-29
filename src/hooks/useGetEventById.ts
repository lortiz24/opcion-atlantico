import React, { useEffect, useState } from 'react'
import { IEvent } from '../interfaces/events-interfaces';
import { eventController } from '../controllers/events/event.controller';


const useGetEventById = (eventId: string) => {
    const [event, setEvent] = useState<IEvent>();
    const [loading, setLoading] = useState(true);

    const getDate = async () => {
        let event: IEvent | undefined
        if (!eventId) return setLoading(false)
        event = await eventController.getEventById(eventId)
        if (event) setEvent(event)
        setLoading(false)
    }
    useEffect(() => {
        getDate()
    }, [])


    return {
        loading,
        event
    }
}

export default useGetEventById