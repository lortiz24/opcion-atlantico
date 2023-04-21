import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import EventRouter from '../features/eventModule/EventRouter';
import ModoulesRouter from '../features/configuration-system/modules/ModulesRouter';
import EventView from '../features/eventModule/EventView';
import LoginPages from '../auth/pages/LoginPages';
import MainLayout from '../layouts/MainLayouts';

export const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/login' element={<LoginPages />} />
				<Route
					path='/*'
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
			</Routes>
		</>
	);
};
