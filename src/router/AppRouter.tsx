import { Route, Routes } from "react-router-dom"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "./PublicRoute"
import EventRouter from "../features/eventModule/EventRouter"
import ModoulesRouter from "../features/configuration-system/modules/ModulesRouter"
import EventView from "../features/eventModule/EventView"



export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/events/*" element={<EventView />} />
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
