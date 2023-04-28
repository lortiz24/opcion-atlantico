import React, { useEffect, useState } from 'react'
import { ICoditionsGetEvents, IEvent } from '../interfaces/events-interfaces';
import { eventController } from '../controllers/events/event.controller';


const useGetEvents = (condition?: ICoditionsGetEvents[] | ICoditionsGetEvents) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const getDate = async () => {
        let events: IEvent[] | undefined = []
        if (Array.isArray(condition) || (!Array.isArray(condition) && !condition)) {
            events = await eventController.getEvents({ moderators: true }, condition)
            if (events) setEvents(events)
        } else {
            events = await eventController.getEvents({ moderators: true }, [condition])
            if (events) setEvents(events)
        }
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