import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventView from '../my-events/EventView'

const EventRouter = () => {
    return (
        <Routes>
            <Route path="/my-events" element={<EventView />} />
        </Routes>
    )
}

export default EventRouter