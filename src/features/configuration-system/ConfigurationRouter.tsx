import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ModulesView from './modules/ModulesView'
import TitleModule from '../../components/title-modules/TitleModule'
import ResourceView from './resources/ResourceView'

const ConfigurationRouter = () => {
    return (
        <Routes>
            <Route path="/modules" element={<TitleModule title='Configuracion de modulos'><ModulesView /></TitleModule>} />
            <Route path="/resources" element={<TitleModule title='Recursos'><ResourceView /></TitleModule>} />
        </Routes>
    )
}

export default ConfigurationRouter