import React, { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Iprop {
  auth: boolean;
  uid: string | null;
  children?: ReactElement;
}

const AuthenticationRoute = ({ auth, uid }: Iprop): ReactElement | null => {
  if (auth) {
    return uid ? <Outlet /> : <Navigate to="/" replace />;
  } else {
    return uid ? <Navigate to="/" replace /> : <Outlet />;
  }
};

export default AuthenticationRoute;
