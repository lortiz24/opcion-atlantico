import React from 'react'
import { useAppSelector } from '../../../../store/store'
import useGetEvents from '../../../../hooks/useGetEvents'
import EventList from '../EventList'

const EventModerator = () => {
    const { uid } = useAppSelector(sel => sel.auth)
    const { events, loading } = useGetEvents({ nameProperty: 'moderators', operation: 'array-contains', value: uid ?? '' }, { moderators: true, assistants: false })
    return (
        <EventList eventList={events} typeView='event-all' isLoading={loading} />
    )
}

export default EventModerator