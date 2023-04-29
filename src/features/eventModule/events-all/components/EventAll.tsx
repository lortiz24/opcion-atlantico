import React from 'react'
import useGetEvents from '../../../../hooks/useGetEvents'
import EventList from '../EventList'

const EventAll = () => {
    const { events, loading } = useGetEvents(undefined, { moderators: true, assistants: false })

    return (
        <EventList eventList={events} isLoading={loading} typeView={'event-all'} />
    )
}

export default EventAll