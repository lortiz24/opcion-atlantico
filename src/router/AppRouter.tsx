import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { FeatureRoutes } from '../features/FeatureRoutes';
import { useCheckAuth } from '../hooks/useCheckAuth';
import LoadingComponent from '../components/loading/LoadingComponent';

export const AppRouter = () => {
	const status = useCheckAuth();
	if (status === 'checking') {
		console.log('Recarga')
		return <LoadingComponent isLoading={status === 'checking'} />
	}
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
