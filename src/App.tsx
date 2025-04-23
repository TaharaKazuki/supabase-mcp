import React from 'react';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App" style={{ 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh', 
      padding: '20px' 
    }}>
      <TodoList />
    </div>
  );
}

export default App; 