import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventView from './EventView'

const EventsRouter = () => {
    return (
        <Routes>
            <Route path="/all-events" element={<EventView />} />
        </Routes>
    )
}

export default EventsRouter