import { Navigate, Route, Routes } from 'react-router-dom';
import ConfigurationRouter from '../features/configuration-system/modules/ModulesRouter';
import EventView from '../features/eventModule/EventView';
import MainLayout from '../layouts/MainLayouts';
import { useAppSelector } from '../store/store';

export const FeatureRoutes = () => {
    return (
        <>
            <MainLayout>
                <Routes>
                    <Route
                        path='/events/*'
                        element={
                            <EventView />
                        }
                    />
                    <Route
                        path='/configuration/*'
                        element={
                            <ConfigurationRouter />
                        }
                    />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </MainLayout>
        </>
    );
};
