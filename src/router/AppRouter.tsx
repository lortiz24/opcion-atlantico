import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { FeatureRoutes } from '../features/FeatureRoutes';
import { useCheckAuth } from '../hooks/useCheckAuth';
import LoadingComponent from '../components/loading/LoadingComponent';
import CheckingTokenQrView from '../components/chekingTokenQr/CheckingTokenQrView';

export const AppRouter = () => {
	const status = useCheckAuth();
	if (status === 'checking') {
		return <LoadingComponent isLoading={status === 'checking'} />;
	}

	
	return (
		<>
			<Routes>
				<Route
					path='/check-qr-Attendance/:eventId/:token'
					element={<CheckingTokenQrView />}
				/>
				{status === 'authenticated' ? (
					<Route path='/*' element={<FeatureRoutes />} />
				) : (
					<Route path='/auth/*' element={<AuthRoutes />} />
				)}

				<Route path='/*' element={<Navigate to={`/auth/login`} />} />
			</Routes>
		</>
	);
};
