import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TitleModule from '../../components/title-modules/TitleModule'
import EventConfigurationView from './event-configuration/EventConfigurationView'

const ConfigurationRoute = () => {
    return (
        <Routes>
            <Route path="/events" element={<TitleModule title='Configuracion de modulos'><EventConfigurationView /></TitleModule>} />
          
        </Routes>
    )
}

export default ConfigurationRoute