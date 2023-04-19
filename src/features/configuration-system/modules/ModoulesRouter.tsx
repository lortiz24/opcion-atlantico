import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ModulesView from './ModulesView'

const ModoulesRouter = () => {
    return (
        <Routes>
            <Route path="/modules" element={<ModulesView />} />
        </Routes>
    )
}

export default ModoulesRouter