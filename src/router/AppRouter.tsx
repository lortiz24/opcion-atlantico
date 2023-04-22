import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { FeatureRoutes } from '../features/FeatureRoutes';

export const AppRouter = () => {
	const { status } = useAppSelector(selector => selector.auth)
	console.log('status',status)
	return (
		<>
			<Routes>
				{
					(status === 'authenticated')
						? <Route path="/*" element={<FeatureRoutes />} />
						: <Route path="/auth/*" element={<AuthRoutes />} />
				}
				<Route path='/*' element={<Navigate to='/auth/login' />} />
			</Routes>
		</>
	);
};
