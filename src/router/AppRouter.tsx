import { Route, Routes } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import EventRouter from "../features/eventModule/router/EventRouter"
import ModoulesRouter from "../features/configuration-system/modules/ModoulesRouter"



export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/events/*" element={<EventRouter />} />
        <Route path="/configuration/*" element={<ModoulesRouter />} />

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
