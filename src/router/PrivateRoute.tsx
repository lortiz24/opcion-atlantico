import { Navigate, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';

export const PrivateRoute = ({ children }: { children: React.ReactNode; }) => {
	useNavigate()
	const { status } = useAppSelector(selector => selector.auth);
	console.log(status)
	return (
		<>{status === 'authenticated' ? children : <Navigate to={'/login'} />}</>
	);
};
