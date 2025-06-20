import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserFeed from "./UserFeed";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="app__header">
          <div className="app__header-content">
            <h1 className="app__title">
              <span className="app__title-icon">👥</span>
              <span className="app__title-text">User Directory</span>
            </h1>
            <p className="app__subtitle">
              Infinite scroll user feed with real-time data
            </p>
          </div>
          <div className="app__header-bg"></div>
        </header>

        <main className="app__main">
          <div className="app__container">
            <UserFeed />
          </div>
        </main>

        <footer className="app__footer">
          <p>&copy; 2025 User Directory. Built with React & TanStack Query.</p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;