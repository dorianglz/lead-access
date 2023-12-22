import React, { useContext } from 'react';

import AuthContext from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {

    const { auth } = useContext(AuthContext)

    if (!auth.email) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            { children }                
        </>
    );
};