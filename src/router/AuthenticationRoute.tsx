import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Iprop {
  auth: boolean;
  uid: string | null;
}

const AuthenticationRoute = ({ auth, uid }: Iprop) => {
  if (auth) {
    return uid ? <Outlet /> : <Navigate to="/" replace />;
  } else {
    return uid ? <Navigate to="/" replace /> : <Outlet />;
  }
};

export default AuthenticationRoute;
