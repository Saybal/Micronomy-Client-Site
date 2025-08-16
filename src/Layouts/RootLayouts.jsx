import React from 'react';
import { Outlet } from 'react-router';
import AutoScrollUp from './AutoScrollUp';
import Navbar from '../Shared/Components/Navbar/Navbar';
import Footer from '../Shared/Components/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <AutoScrollUp/>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;