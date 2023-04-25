import React, { useEffect, useState } from 'react'
import { IEvent } from '../interfaces/events-interfaces';
import { eventController } from '../controllers/events/event.controller';


const useGetEvents = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const getDate = async () => {
        const events = await eventController.getEvents()
        if (events) setEvents(events)
        setLoading(false)
    }
    useEffect(() => {
        getDate()
    }, [])


    return {
        loading,
        events
    }
}

export default useGetEvents