export interface ChatMessage {
  id: number;
  sender: 'user' | 'support';
  text: string;
  timestamp: string;
  avatar: string;
}

export interface Email {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  body: string;
  timestamp: string;
  read: boolean;
  avatar: string;
}

export enum AppType {
  CHAT = 'chat',
  EMAIL = 'email',
}
