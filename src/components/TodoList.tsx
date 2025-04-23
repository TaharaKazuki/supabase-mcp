import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import TodoItem from './TodoItem';
import { useAuth } from '../lib/AuthContext';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
}

const TodoList: React.FC = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(true);

  // Todoリストを取得
  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setTodos(data);
      }
    } catch (error) {
      console.error('Todosの取得エラー:', error);
      alert('Todosの取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  // 新しいTodoを追加
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim() || !user) return;

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ 
          title: newTodoTitle,
          user_id: user.id 
        }])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setTodos([...data, ...todos]);
        setNewTodoTitle('');
      }
    } catch (error) {
      console.error('Todoの追加エラー:', error);
      alert('Todoの追加に失敗しました。');
    }
  };

  // Todoの完了状態を切り替え
  const toggleTodo = async (id: string) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const { error } = await supabase
        .from('todos')
        .update({ completed: !todoToUpdate.completed })
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (error) {
      console.error('Todoの更新エラー:', error);
      alert('Todoの更新に失敗しました。');
    }
  };

  // Todoを削除
  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Todoの削除エラー:', error);
      alert('Todoの削除に失敗しました。');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Todoリスト</h1>
      
      <form onSubmit={addTodo} style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={e => setNewTodoTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          style={{ 
            flex: 1, 
            padding: '10px', 
            borderRadius: '4px 0 0 4px',
            border: '1px solid #ddd'
          }}
        />
        <button 
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '0 4px 4px 0',
            padding: '10px 15px',
            cursor: 'pointer'
          }}
        >
          追加
        </button>
      </form>

      {loading ? (
        <p style={{ textAlign: 'center' }}>読み込み中...</p>
      ) : todos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>タスクはありません。新しいタスクを追加してください。</p>
      ) : (
        <div>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList; 