import React from 'react'
import EventList from '../EventList'
import useGetEvents from '../../../../hooks/useGetEvents'
import { useAppSelector } from '../../../../store/store'

const EventParticipants = () => {
    const { uid } = useAppSelector(sel => sel.auth)
    const { events, loading } = useGetEvents({ nameProperty: 'assistants', operation: 'array-contains', value: uid ?? '' }, { moderators: true, assistants: false })
    return (
        <EventList eventList={events} typeView='event-all' />
    )
}

export default EventParticipants