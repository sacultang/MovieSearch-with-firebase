import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthRouteProps {
  auth: boolean;
  uid: string | null;
}

const AuthenticationRoute = ({ auth, uid }: AuthRouteProps) => {
  if (auth) {
    return uid ? <Outlet /> : <Navigate to="/" replace />;
  } else {
    return uid ? <Navigate to="/" replace /> : <Outlet />;
  }
};

export default AuthenticationRoute;
