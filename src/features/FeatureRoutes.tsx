import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayouts';
import MyProfileView from './my-profile/MyProfileView';
import CheckingTokenQrView from '../components/chekingTokenQr/CheckingTokenQrView';
import TitleModule from '../components/title-modules/TitleModule';
import MyEventView from './eventModule/my-events/MyEventView';
import EventView from './eventModule/events-all/EventView';
import UsersView from './users/UsersView';
import PageInDeveloper from '../components/results/PageInDeveloper';
import ConfigurationSystemRouter from './configuration-system/ConfigurationRouter';
import ConfigurationRoute from './configuration/ConfigurationRoute';

export const FeatureRoutes = () => {
	return (
		<>
			<MainLayout>
				<Routes>
					<Route path='/check-qr-Attendance/:eventId/:token' element={<CheckingTokenQrView />} />
					<Route path='/auth/login' element={<Navigate to='/events/all-events' />} />
					<Route path='/my-profile/*' element={<MyProfileView />} />

					<Route path='/events' element={<TitleModule title='Todos los eventos'><EventView /></TitleModule>} />
					<Route path="/my-events-management" element={<TitleModule title='Gestion de mis eventos'><MyEventView /></TitleModule>} />
					<Route path="/users" element={<TitleModule title='Gestion de usuarios'><PageInDeveloper /></TitleModule>} />

					<Route path='/configuration/*' element={<ConfigurationRoute />} />
					<Route path='/configuration-system/*' element={<ConfigurationSystemRouter />} />

					<Route path='/*' element={<Navigate to='/events' />} />
				</Routes>
			</MainLayout>
		</>
	);
};
