import React from 'react'
import { Routes } from 'react-router';
import { Route } from 'react-router-dom'
import LoginPage from '../app/pages/LoginPage';

import { PageRoutes } from '../app/routes/PageRoutes';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <Routes>
                        <Route path="/*" element={<LoginPage />} />
                    </Routes>
                }
                />

                <Route path="/*" element={
                    <PageRoutes />
                } />
            </Routes>
        </>
    )
}