import { Navigate, Route, Routes } from 'react-router-dom';
import EventRouter from '../features/eventModule/EventRouter';
import ModoulesRouter from '../features/configuration-system/modules/ModulesRouter';
import EventView from '../features/eventModule/EventView';
import LoginPages from '../auth/pages/LoginPages';
import MainLayout from '../layouts/MainLayouts';
import RegisterPage from '../auth/pages/RegisterPage';
import { useAppSelector } from '../store/store';
import { PrivateRoute } from '../router/PrivateRoute';

export const FeatureRoutes = () => {
    const { status } = useAppSelector(selector => selector.auth)
    return (
        <>
            <Routes>
                <Route
                    path='/'
                    element={
                        <MainLayout>
                            <Routes>
                                <Route
                                    path='/events/*'
                                    element={
                                        <PrivateRoute>
                                            <EventView />
                                        </PrivateRoute>
                                    }
                                />

                                <Route
                                    path='/configuration/*'
                                    element={
                                        <PrivateRoute>
                                            <ModoulesRouter />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </MainLayout>
                    }
                />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};
