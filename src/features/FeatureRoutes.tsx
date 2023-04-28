import { Navigate, Route, Routes } from 'react-router-dom';
import ConfigurationRouter from './configuration-system/ConfigurationRouter';
import MainLayout from '../layouts/MainLayouts';
import EventsRouter from './eventModule/EventsRouter';
import MyProfileView from './my-profile/MyProfileView';
import CheckingTokenQrView from '../components/chekingTokenQr/CheckingTokenQrView';

export const FeatureRoutes = () => {
	return (
		<>
			<MainLayout>
				<Routes>
					<Route path='/check-qr-Attendance/:eventId/:token' element={<CheckingTokenQrView />} />
					<Route path='/auth/login' element={<Navigate to='/events/all-events' />} />
					<Route path='/my-profile/*' element={<MyProfileView />} />
					<Route path='/events/*' element={<EventsRouter />} />
					<Route path='/configuration/*' element={<ConfigurationRouter />} />
					<Route path='/*' element={<Navigate to='/events/all-events' />} />
				</Routes>
			</MainLayout>
		</>
	);
};
