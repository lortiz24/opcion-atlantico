import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ModulesView from './modules/ModulesView'

const ConfigurationRouter = () => {
    return (
        <Routes>
            <Route path="/modules" element={<ModulesView />} />
        </Routes>
    )
}

export default ConfigurationRouter