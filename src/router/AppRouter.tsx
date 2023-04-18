import { Route, Routes } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import AttendanceApp from "../features/attendance/AttendanceApp"
import ModulesView from "../features/configuration-system/modules/ModulesView"



export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/attendance" element={<AttendanceApp />} />
        <Route path="/modules" element={<ModulesView />} />

        {/* <Route
          path="login"
          element={<PublicRoute>
            <LoginPages />
          </PublicRoute>} />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>} /> */}

      </Routes>
    </>
  )
}
