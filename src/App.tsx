import React from 'react';
import TodoList from './components/TodoList';
import Auth from './components/Auth';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './lib/AuthContext';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p style={{ fontSize: '18px' }}>読み込み中...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh', 
      padding: '20px' 
    }}>
      {user ? (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '30px',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Profile />
          </div>
          <TodoList />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App; 