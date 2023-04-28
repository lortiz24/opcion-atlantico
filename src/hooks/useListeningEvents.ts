import React, { useEffect, useState } from 'react'
import { ICoditionsGetEvents, IEvent } from '../interfaces/events-interfaces';
import { eventController } from '../controllers/events/event.controller';
import { Unsubscribe } from 'firebase/auth';


const useListeningEvents = (condition?: ICoditionsGetEvents[] | ICoditionsGetEvents) => {
    const [eventsListening, setEventsListening] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const onSet = (events: IEvent[]) => {
        setEventsListening(events)
        setLoading(false)
    }
    useEffect(() => {
        let unsubscribe: Unsubscribe
        if (Array.isArray(condition) || (!Array.isArray(condition) && !condition)) {
            unsubscribe = eventController.listeningMenus(onSet)
        } else {
            unsubscribe = eventController.listeningMenus(onSet)
        }
        return () => {
            unsubscribe()
        }
    }, [])


    return {
        loading,
        eventsListening
    }
}

export default useListeningEvents