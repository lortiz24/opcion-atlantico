import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AttendanceApp from '../AttendanceApp'

const AttendanceRouter = () => {
    return (
        <Routes>
            <Route path="/attendance" element={<AttendanceApp />} />
        </Routes>
    )
}

export default AttendanceRouter