import React from 'react';
import Sidebar from './Sidebar.js';
import Topbar from './Topbar.js';

function Layout(props) {
    return (
        <div className='main-layout'>
            <Sidebar />

            <div className='container'>
                <Topbar />
                <main>{props.children}</main>
            </div>
        </div>
    )
}

export default Layout;
