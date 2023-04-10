import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AttendanceApp from '../features/attendance/AttendanceApp'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/attendance" element={<AttendanceApp />} />
    </Routes>
  )
}

export default AppRouter