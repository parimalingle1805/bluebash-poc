import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatApp from './features/chat/ChatApp';
import EmailApp from './features/email/EmailApp';
import { AppType } from './types';

const App: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppType>(AppType.CHAT);
  const [chatNotifications, setChatNotifications] = useState(1);
  const [emailNotifications, setEmailNotifications] = useState(3);

  const handleNavClick = useCallback((app: AppType) => {
    setActiveApp(app);
    // When the user navigates to the chat, clear the notifications.
    if (app === AppType.CHAT) {
      setChatNotifications(0);
    }
  }, []);

  const renderActiveApp = () => {
    switch (activeApp) {
      case AppType.CHAT:
        return <ChatApp setChatNotifications={setChatNotifications} />;
      case AppType.EMAIL:
        return <EmailApp setEmailNotifications={setEmailNotifications} />;
      default:
        return <ChatApp setChatNotifications={setChatNotifications} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-800 dark:text-gray-200 flex-col md:flex-row">
      <Sidebar 
        activeApp={activeApp} 
        onNavClick={handleNavClick} 
        chatNotifications={chatNotifications}
        emailNotifications={emailNotifications}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        {renderActiveApp()}
      </main>
    </div>
  );
};

export default App;
