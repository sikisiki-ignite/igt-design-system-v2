import React from 'react';
import './AppLayout.css';

export interface AppLayoutProps {
  topNav: React.ReactNode;
  sideNav: React.ReactNode;
  children: React.ReactNode;
}

export function AppLayout({ topNav, sideNav, children }: AppLayoutProps) {
  return (
    <div className="igt-app-layout">
      <header className="igt-app-layout__top-nav">{topNav}</header>
      <div className="igt-app-layout__body">
        <aside className="igt-app-layout__side-nav">{sideNav}</aside>
        <main className="igt-app-layout__content">{children}</main>
      </div>
    </div>
  );
}
