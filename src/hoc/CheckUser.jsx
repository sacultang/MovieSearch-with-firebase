import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RequiredLogin, RequiredLogout } from './userAccessType';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CheckUser(Component, option = null) {
  function CheckUser(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
      if (option) {
        if (option === RequiredLogin && !user) {
          navigate('/login', { state: { path: location.pathname } });
        }
        if (option === RequiredLogout && user) navigate('/');
      }
    }, [dispatch, navigate, location.pathname, user]);
    return (
      <>
        {option === RequiredLogin ? (
          <Component {...props} user={user} />
        ) : (
          <Component {...props} />
        )}
      </>
    );
  }
  return CheckUser;
}
