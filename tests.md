# Testing Strategy & Test Cases

## Philosophy

For this Proof of Concept, the goal is to demonstrate a clear understanding of testing principles without adding the complexity of a full testing environment (Jest, Babel, etc.). This keeps the project's dependencies focused on the core task.

The following test cases are written using the syntax of **Jest** and **React Testing Library**. They outline the testing strategy I would implement in a full production environment.

---

### 1. Host Application (`App.tsx`) Tests

The host application is responsible for routing, layout, and communication.

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Host Application', () => {

  it('should render the Chat application by default', () => {
    render(<App />);
    // Check for a heading unique to the ChatApp
    expect(screen.getByRole('heading', { name: /support chat/i })).toBeInTheDocument();
  });

  it('should switch to the Email application when the email nav item is clicked', () => {
    render(<App />);
    
    // Find and click the Email navigation button
    const emailNavButton = screen.getByRole('button', { name: /email/i });
    fireEvent.click(emailNavButton);

    // Check for a heading unique to the EmailApp
    expect(screen.getByRole('heading', { name: /inbox/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /support chat/i })).not.toBeInTheDocument();
  });

  it('should clear chat notifications when the chat nav item is clicked', () => {
    render(<App />);

    // Initially, the chat notification badge should be visible
    // The notification count for desktop is inside a span with the count
    const chatNotificationBadge = screen.getByText('1');
    expect(chatNotificationBadge).toBeInTheDocument();

    // Click on the Email tab first to navigate away
    fireEvent.click(screen.getByRole('button', { name: /email/i }));
    
    // Click back on the Chat tab
    fireEvent.click(screen.getByRole('button', { name: /chat/i }));

    // The notification badge should now be gone
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

});
```

---

### 2. Chat Micro-Frontend (`src/features/chat/ChatApp.tsx`)

The chat app should manage its own state and display messages correctly.

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatApp from './features/chat/ChatApp';

describe('ChatApp Micro-Frontend', () => {

  const mockSetChatNotifications = jest.fn();

  it('should render the initial welcome message from support', () => {
    render(<ChatApp setChatNotifications={mockSetChatNotifications} />);
    expect(screen.getByText(/Hello! Thanks for contacting Bluebash Support/i)).toBeInTheDocument();
  });

  it('should allow a user to type and send a new message', async () => {
    render(<ChatApp setChatNotifications={mockSetChatNotifications} />);
    
    const input = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByRole('button'); // The send button has an SVG icon, so we grab it more generically

    // Type a new message
    fireEvent.change(input, { target: { value: 'This is a test message' } });
    expect(input.value).toBe('This is a test message');

    // Send the message
    fireEvent.click(sendButton);

    // The new message should appear on the screen
    expect(await screen.findByText('This is a test message')).toBeInTheDocument();

    // The input should be cleared
    expect(input.value).toBe('');
    
    // And a response should appear after a delay
    await waitFor(() => {
      expect(screen.getByText(/Thanks for your message/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
```

---

### 3. Email Micro-Frontend (`src/features/email/EmailApp.tsx`)

The email app should manage its email list and detail view.

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import EmailApp from './features/email/EmailApp';

describe('EmailApp Micro-Frontend', () => {

  const mockSetEmailNotifications = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    mockSetEmailNotifications.mockClear();
  });

  it('should render the list of emails by default', () => {
    render(<EmailApp setEmailNotifications={mockSetEmailNotifications} />);
    // Check for the subject of the first unread email
    expect(screen.getByText(/Your pull request was merged!/i)).toBeInTheDocument();
  });

  it('should switch to the detail view when an email is clicked', () => {
    render(<EmailApp setEmailNotifications={mockSetEmailNotifications} />);
    
    // Find and click the first email by its subject text
    const firstEmailSubject = screen.getByText(/Your pull request was merged!/i);
    // The button is the parent element
    fireEvent.click(firstEmailSubject.closest('button'));

    // The email body should now be visible
    expect(screen.getByText(/Full body of the email about the merged pull request goes here./i)).toBeInTheDocument();
  });

  it('should mark an email as read and update the notification count when opened', () => {
    render(<EmailApp setEmailNotifications={mockSetEmailNotifications} />);

    // The mock function should be called on initial render with the unread count (3)
    expect(mockSetEmailNotifications).toHaveBeenCalledWith(3);
    
    // Click the first unread email
    const firstEmailSubject = screen.getByText(/Your pull request was merged!/i);
    fireEvent.click(firstEmailSubject.closest('button'));

    // After clicking, the unread count becomes 2. The mock function should be called again.
    expect(mockSetEmailNotifications).toHaveBeenCalledWith(2);
  });
});
```
