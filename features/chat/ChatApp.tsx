import React, { useState, useCallback } from 'react';
import { ChatMessage } from '../../types';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';

const initialMessages: ChatMessage[] = [
  { id: 1, sender: 'support', text: "Hello! Thanks for contacting Bluebash Support. How can I help you today?", timestamp: '10:30 AM', avatar: 'https://i.pravatar.cc/150?u=support' },
];

interface ChatAppProps {
  setChatNotifications: React.Dispatch<React.SetStateAction<number>>;
}

const ChatApp: React.FC<ChatAppProps> = ({ setChatNotifications }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() === '') return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://i.pravatar.cc/150?u=user',
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setChatNotifications(0); // Also clear here in case it was a new message arriving while on the screen

    setTimeout(() => {
        const supportResponse: ChatMessage = {
            id: Date.now() + 1,
            sender: 'support',
            text: "Thanks for your message. We're looking into it and will get back to you shortly.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: 'https://i.pravatar.cc/150?u=support',
        }
        setMessages(prev => [...prev, supportResponse]);
    }, 1500);

  }, [newMessage, setChatNotifications]);

  return (
    <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Support Chat</h2>
        <p className="text-gray-500 dark:text-gray-400">Welcome to our support channel</p>
      </header>
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
              {msg.sender === 'support' && <Avatar src={msg.avatar} alt="Support" />}
              <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1 text-right">{msg.timestamp}</p>
              </div>
              {msg.sender === 'user' && <Avatar src={msg.avatar} alt="User" />}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSendMessage}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatApp;