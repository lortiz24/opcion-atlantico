import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ModulesView from './modules/ModulesView'
import TitleModule from '../../components/title-modules/TitleModule'
import ResourceView from './resources/ResourceView'
import PageInDeveloper from '../../components/results/PageInDeveloper'
import ParameterView from './parameters/ParameterView'

const ConfigurationSystemRouter = () => {
    return (
        <Routes>
            <Route path="/modules" element={<TitleModule title='Configuracion de modulos'><ModulesView /></TitleModule>} />
            <Route path="/resources" element={<TitleModule title='Recursos'><PageInDeveloper /></TitleModule>} />
            <Route path="/parameters" element={<TitleModule title='Recursos'><ParameterView /></TitleModule>} />
        </Routes>
    )
}

export default ConfigurationSystemRouter