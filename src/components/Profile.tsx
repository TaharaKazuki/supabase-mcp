import React from 'react';
import { useAuth } from '../lib/AuthContext';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>プロフィール</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p><strong>メールアドレス:</strong> {user?.email}</p>
        <p><strong>ユーザーID:</strong> {user?.id}</p>
        <p><strong>最終ログイン:</strong> {new Date(user?.last_sign_in_at || '').toLocaleString('ja-JP')}</p>
      </div>
      
      <button
        onClick={signOut}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 15px',
          width: '100%',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ログアウト
      </button>
    </div>
  );
};

export default Profile; 