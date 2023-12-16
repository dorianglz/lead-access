import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

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