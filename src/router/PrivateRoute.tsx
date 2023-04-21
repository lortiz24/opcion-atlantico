import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/store';

export const PrivateRoute = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const { pathname, search } = useLocation();
	const lastpath = pathname + search;
	localStorage.setItem('lastpath', lastpath);
	// const { logged } = useContext(AuthContext);
	const { status } = useAppSelector(selector => selector.auth);
	return (
		<> {children} </>
	);
};
