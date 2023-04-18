import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }:{children:React.ReactNode}) => {
    const {pathname,search} = useLocation()
    const lastpath = pathname + search;
    localStorage.setItem('lastpath', lastpath)
    // const { logged } = useContext(AuthContext);

    return (true)
        ? children
        :
        <Navigate to='/login' />

}
