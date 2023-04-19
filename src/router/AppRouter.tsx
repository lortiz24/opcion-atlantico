import { Route, Routes } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import ModulesView from "../features/configuration-system/modules/ModulesView"
import EventRouter from "../features/eventModule/router/EventRouter"



export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/events" element={<EventRouter />} />
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
