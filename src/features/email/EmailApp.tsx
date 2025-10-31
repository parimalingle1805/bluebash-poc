import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Email } from '../../types';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';

const mockEmails: Email[] = [
  { id: '1', sender: 'GitHub', subject: 'Your pull request was merged!', snippet: 'Hey Parimal, your PR #123 in bluebash/micro-frontend-poc was...', body: 'Full body of the email about the merged pull request goes here.', timestamp: '3:45 PM', read: false, avatar: 'https://i.pravatar.cc/150?u=github' },
  { id: '2', sender: 'Vercel', subject: 'Deployment Successful', snippet: 'Your project `micro-frontend-poc` was successfully deployed.', body: 'Full body of the Vercel deployment email.', timestamp: '2:10 PM', read: false, avatar: 'https://i.pravatar.cc/150?u=vercel' },
  { id: '3', sender: 'HR @ Bluebash', subject: 'Welcome to the team!', snippet: 'We are thrilled to have you join us. Here are some...', body: 'Full body of the welcome email.', timestamp: '11:00 AM', read: false, avatar: 'https://i.pravatar.cc/150?u=hr' },
  { id: '4', sender: 'Figma', subject: 'Updates to your design file', snippet: 'A collaborator has made changes to the "Main App" design.', body: 'Full body of the Figma update email.', timestamp: 'Yesterday', read: true, avatar: 'https://i.pravatar.cc/150?u=figma' },
  { id: '5', sender: 'LinkedIn', subject: 'You appeared in 42 searches this week', snippet: 'See who\'s searching for you and what they are looking for.', body: 'Full body of the LinkedIn summary.', timestamp: 'Yesterday', read: true, avatar: 'https://i.pravatar.cc/150?u=linkedin' },
];


interface EmailAppProps {
  setEmailNotifications: React.Dispatch<React.SetStateAction<number>>;
}

const EmailApp: React.FC<EmailAppProps> = ({ setEmailNotifications }) => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const selectedEmail = useMemo(() => emails.find(e => e.id === selectedEmailId), [emails, selectedEmailId]);
  const unreadCount = useMemo(() => emails.filter(e => !e.read).length, [emails]);

  useEffect(() => {
    setEmailNotifications(unreadCount);
  }, [unreadCount, setEmailNotifications]);
  
  const handleSelectEmail = useCallback((email: Email) => {
    setSelectedEmailId(email.id);
    if (!email.read) {
        setEmails(prevEmails => 
            prevEmails.map(e => e.id === email.id ? { ...e, read: true } : e)
        );
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      <header className={`p-4 md:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700 ${selectedEmailId ? 'hidden md:block' : ''}`}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inbox</h2>
        <p className="text-gray-500 dark:text-gray-400">You have {unreadCount} unread messages.</p>
      </header>
      <div className="flex-1 flex overflow-hidden">
        {/* Email List */}
        <aside className={`h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 w-full md:w-1/3 xl:w-1/4 ${selectedEmailId ? 'hidden md:block' : 'block'}`}>
          <ul>
            {emails.map((email) => (
              <li key={email.id}>
                <button
                  onClick={() => handleSelectEmail(email)}
                  className={`w-full text-left p-4 border-l-4 transition-colors duration-150 ${
                    selectedEmailId === email.id 
                    ? 'bg-blue-50 dark:bg-blue-900/50 border-blue-600' 
                    : `border-transparent hover:bg-gray-100 dark:hover:bg-gray-700 ${!email.read ? 'font-bold' : ''}`
                  }`}
                >
                  <div className="flex justify-between items-baseline">
                    <span className={`truncate ${!email.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>{email.sender}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{email.timestamp}</span>
                  </div>
                  <p className={`text-sm mt-1 truncate ${!email.read ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}`}>{email.subject}</p>
                  <p className="text-xs mt-1 text-gray-500 dark:text-gray-400 truncate">{email.snippet}</p>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        
        {/* Email Content */}
        <main className={`overflow-y-auto ${selectedEmailId ? 'block' : 'hidden md:block'} flex-1`}>
          {selectedEmail ? (
            <div className="p-4 sm:p-6 md:p-8 h-full">
              <Card className="p-4 sm:p-6 h-full">
                <div className="flex items-center mb-6">
                    <button onClick={() => setSelectedEmailId(null)} className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                  <Avatar src={selectedEmail.avatar} alt={selectedEmail.sender} className="mr-4"/>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedEmail.subject}</h3>
                    <p className="text-gray-600 dark:text-gray-400">From: {selectedEmail.sender}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">{selectedEmail.timestamp}</p>
                  </div>
                </div>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                  <p>{selectedEmail.body}</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
                  <p>Best regards,</p>
                  <p>{selectedEmail.sender}</p>
                </div>
              </Card>
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center h-full text-gray-500">
              <p>Select an email to read</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmailApp;
