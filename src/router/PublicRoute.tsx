import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';

interface IPublicRouteProps {
  children: React.ReactNode
}
export const PublicRoute = ({ children }: IPublicRouteProps) => {
  // const { logged } = useContext(AuthContext);

  return (!false)
    ? children
    :
    <Navigate to='/' />
}
