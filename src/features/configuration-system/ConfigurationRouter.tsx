import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ModulesView from './modules/ModulesView'
import TitleModule from '../../components/title-modules/TitleModule'

const ConfigurationRouter = () => {
    return (
        <Routes>
            <Route path="/modules" element={<TitleModule title='Configuracion de modulos'><ModulesView /></TitleModule>} />
        </Routes>
    )
}

export default ConfigurationRouter