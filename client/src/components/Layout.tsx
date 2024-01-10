import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './NavBar';

function Layout(): JSX.Element {
  return (
    <div>
      <NavBar /> <Outlet />
    </div>
  );
}

export default Layout;
