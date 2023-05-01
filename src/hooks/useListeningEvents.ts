import React, { useEffect, useState } from 'react'
import { IWhereQuerys, IEvent, ISelectedForeign } from '../interfaces/events-interfaces';
import { eventController } from '../controllers/events/event.controller';


const useListeningEvents = (condition?: IWhereQuerys[] | IWhereQuerys, selectedForeing?: ISelectedForeign) => {
    const [eventsListening, setEventsListening] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const onSet = (events: IEvent[]) => {
        setEventsListening(events)
        setLoading(false)
    }
    useEffect(() => {
        let conditions

        if (Array.isArray(condition)) {
            conditions = condition
        } else if (condition) {
            conditions = [condition]
        }

        const unsubscribe = eventController.listeningEvents(onSet, conditions, selectedForeing)
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