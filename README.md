# # Micro-Frontend POC for Bluebash

This project is a Proof of Concept (POC) demonstrating a micro-frontend architecture using React.

The application consists of a main **Host Application** that manages a shared design system and two micro-applications: a **Chat App** and an **Email App**.

## Live Demo

**[>> View the live application here <<](https://bluebash-poc.vercel.app/)**

## Key Features

- **Micro-Frontend Architecture (Simulated):** The application is modular, with `ChatApp` and `EmailApp` acting as self-contained features.
- **Shared Design System:** A central `components` directory provides reusable UI elements like Cards, Buttons, and Avatars that are consumed by all micro-apps.
- **Inter-App Communication:** The micro-apps communicate with the host application via callback props to update shared state, such as notification counts.
- **Fully Responsive:** The UI adapts seamlessly from desktop to mobile, featuring a native-like bottom navigation on smaller screens.
- **Professional Tooling:** Uses Vite for a fast, modern development experience.

## Tools & Frameworks Used

- **React 18:** For building the user interface.
- **Vite:** A modern, fast build tool for frontend development.
- **Tailwind CSS:** For utility-first styling and responsiveness (installed as a PostCSS plugin).
- **TypeScript:** For type safety and improved developer experience.

## How to Set Up and Run the Application Locally

You will need [Node.js](https://nodejs.org/) (v18 or newer) installed on your machine.

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```
2.  **Install Dependencies:**
    Open your terminal in the project's root folder and run the following command to install all the necessary packages from `package.json`.
    ```bash
    npm install
    ```
3.  **Run the Development Server:**
    Once the installation is complete, run this command to start the Vite development server.
    ```bash
    npm run dev
    ```
    The application will now be running. The terminal will show you the local address, which is typically `http://localhost:5173`.

## Key Architectural Decisions and Trade-offs

### 1. Micro-Frontend Architecture Approach

- **Decision:** I chose to **simulate** a micro-frontend architecture by building the features as isolated, self-contained React components rather than implementing a full framework like Webpack Module Federation or Single-SPA.
- **Trade-off:** While a framework like Module Federation offers true runtime integration and independent deployments, it adds significant configuration complexity. For a POC, this approach would have been overkill.
- **Justification:** This simulation effectively demonstrates the core principles of micro-frontends—modularity, separation of concerns, and clear communication channels—in a way that is easy to understand and explain.

### 2. Communication Between Applications

- **Decision:** Communication from the micro-frontends (children) to the host application (parent) is handled via **callback props** (e.g., `setChatNotifications`).
- **Justification:** This is a standard, fundamental React pattern. It's predictable, easy to trace, and avoids the need for a more complex global state management library (like Redux or Zustand), which would be over-engineering for the scope of this POC.

### 3. Testing Strategy

- **Decision:** I chose to write test cases in a separate `tests.md` file using Jest and React Testing Library syntax, rather than integrating a full test runner into the project.
- **Trade-off:** The tests are not executable.
- **Justification:** This was a pragmatic decision to keep the project's dependencies focused on the core task. It successfully demonstrates my knowledge of what to test, how to write meaningful tests, and my commitment to quality, without burdening the POC with a testing environment. Please see the [tests.md](./tests.md) file for the complete testing plan.





**Developed by Parimal Ingle**