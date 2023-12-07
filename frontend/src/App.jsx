import { useNavigate } from 'react-router-dom';
import style from './App.module.css';
import PostList from './components/PostList';
import { useEffect, useState } from 'react';
import Session from 'react-session-api';

function App() {
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  const handleClick = () => {
    if (user === '') {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다');
      navigate('/auth/login');
    } else {
      navigate('/new');
    }
  };

  useEffect(() => {
    // if (Session.get('user')) {
    if (window.sessionStorage.getItem('user')) {
      // setUser(Session.get('user'));
      setUser(window.sessionStorage.getItem('user'));
    }
  });

  return (
    <div className={style.container}>
      <h1 className={style.h1}>Anyone's Page</h1>
      <p className={style.text}>
        누구나 자유롭게 포스팅이 가능한 공간입니다
        {user ? (
          <div style={{ textAlign: 'center' }}>
            <br />
            {user}님 환영합니다
          </div>
        ) : (
          <></>
        )}
      </p>
      <div className={style.button} onClick={handleClick}>
        글 쓰기
      </div>
      <PostList />
    </div>
  );
}

export default App;

