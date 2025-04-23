import React from 'react';

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, title, completed, onToggle, onDelete }) => {
  return (
    <div className="todo-item" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      padding: '10px',
      margin: '5px 0',
      backgroundColor: completed ? '#f0f8ff' : 'white',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        style={{ marginRight: '10px' }}
      />
      <span style={{ 
        flex: 1, 
        textDecoration: completed ? 'line-through' : 'none',
        color: completed ? '#888' : '#333'
      }}>
        {title}
      </span>
      <button 
        onClick={() => onDelete(id)}
        style={{
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '5px 10px',
          cursor: 'pointer'
        }}
      >
        削除
      </button>
    </div>
  );
};

export default TodoItem; 