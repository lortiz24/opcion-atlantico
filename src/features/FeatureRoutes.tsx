import { Navigate, Route, Routes } from 'react-router-dom';
import ConfigurationRouter from './configuration-system/ConfigurationRouter';
import MainLayout from '../layouts/MainLayouts';
import EventsRouter from './eventModule/EventsRouter';

export const FeatureRoutes = () => {
	return (
		<>
			<MainLayout>
				<Routes>
					<Route path='/events/*' element={<EventsRouter />} />
					<Route path='/configuration/*' element={<ConfigurationRouter />} />
					<Route path='/*' element={<Navigate to='/events' />} />
				</Routes>
			</MainLayout>
		</>
	);
};
