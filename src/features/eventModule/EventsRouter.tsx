import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EventView from './events-all/EventView'
import TitleModule from '../../components/title-modules/TitleModule'
import MyEventView from './my-events/MyEventView'

const EventsRouter = () => {
    return (
        <Routes>
            <Route path="/all-events" element={<TitleModule title='Todos los eventos'><EventView /></TitleModule>} />
            <Route path="/events-management" element={<TitleModule title='Mis eventos'><MyEventView /></TitleModule>} />
        </Routes>
    )
}

export default EventsRouter