import React from 'react';
import { AppType } from '../types';

interface SidebarProps {
  activeApp: AppType;
  onNavClick: (app: AppType) => void;
  chatNotifications: number;
  emailNotifications: number;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  notificationCount: number;
  onClick: () => void;
}> = ({ icon, label, isActive, notificationCount, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center p-2 rounded-lg transition-colors duration-200 relative grow
      flex-col text-xs
      md:flex-row md:w-full md:justify-start md:p-3 md:my-1 md:text-base
      ${
        isActive
          ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400 md:bg-blue-600 md:text-white'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }
    `}
  >
    <div className="relative">
      {icon}
      {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center md:hidden">
              {notificationCount}
          </span>
      )}
    </div>
    <span className="mt-1 md:ml-4 md:mt-0 font-medium">{label}</span>
    {notificationCount > 0 && (
      <span className="hidden md:flex ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 items-center justify-center">
        {notificationCount}
      </span>
    )}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeApp, onNavClick, chatNotifications, emailNotifications }) => {
  return (
    <aside className="
      bg-white dark:bg-gray-800 flex 
      w-full p-1 border-t border-gray-200 dark:border-gray-700 order-last 
      md:w-64 md:flex-col md:p-4 md:border-t-0 md:border-r md:order-first md:h-screen
    ">
      <div className="hidden md:flex items-center mb-8">
         <div className="p-2 bg-blue-600 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657z" /></svg>
         </div>
        <h1 className="text-xl font-bold ml-3 text-gray-800 dark:text-white">Bluebash</h1>
      </div>
      <nav className="flex flex-row justify-around w-full md:flex-col">
        <NavItem
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
          label="Chat"
          isActive={activeApp === AppType.CHAT}
          notificationCount={chatNotifications}
          onClick={() => onNavClick(AppType.CHAT)}
        />
        <NavItem
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
          label="Email"
          isActive={activeApp === AppType.EMAIL}
          notificationCount={emailNotifications}
          onClick={() => onNavClick(AppType.EMAIL)}
        />
      </nav>
      <div className="hidden md:flex mt-auto">
        <div className="flex items-center p-2">
            <img className="h-10 w-10 rounded-full" src="https://picsum.photos/100" alt="User Avatar" />
            <div className="ml-3">
                <p className="font-semibold text-gray-800 dark:text-white">Parimal Ingle</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Frontend Dev</p>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
