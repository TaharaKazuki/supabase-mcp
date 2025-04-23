import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        // サインアップ
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) throw error;
        setMessage('確認メールを送信しました。メールを確認してください。');
      } else {
        // ログイン
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`エラー: ${error.message}`);
      } else {
        setMessage('不明なエラーが発生しました。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {isSignUp ? 'アカウント登録' : 'ログイン'}
      </h2>
      
      {message && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: message.includes('エラー') ? '#ffebee' : '#e8f5e9',
          color: message.includes('エラー') ? '#c62828' : '#2e7d32',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ 
            marginBottom: '10px', 
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ 
            marginBottom: '20px', 
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#3F51B5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '12px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? '処理中...' : isSignUp ? 'アカウント登録' : 'ログイン'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        {isSignUp ? 'すでにアカウントをお持ちですか？' : 'アカウントをお持ちでないですか？'}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            background: 'none',
            border: 'none',
            color: '#3F51B5',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginLeft: '5px'
          }}
        >
          {isSignUp ? 'ログイン' : 'アカウント登録'}
        </button>
      </p>
    </div>
  );
};

export default Auth; 