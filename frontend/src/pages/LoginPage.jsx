import { useState } from 'react';
import style from './LoginPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Session from 'react-session-api';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const post = async () => {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        id: id,
        pw: pw,
      }
    );

    if (result.data.status === 'success') {
      window.sessionStorage.setItem('user', id);
      window.sessionStorage.setItem(`${id}_token`, result.data.token);
      navigate('/');
    } else {
      alert('실패');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.inputWrap}>
        <input
          className={style.input}
          type='text'
          value={id}
          placeholder='아이디'
          onChange={handleIdChange}
        />
        <input
          className={style.input}
          type='password'
          value={pw}
          placeholder='비밀번호'
          onChange={handlePwChange}
        />
      </div>
      <div className={style.btnWrap}>
        <div className={style.button} onClick={post}>
          로그인
        </div>
        <Link className={style.button} to={'/auth/register'}>
          회원가입 하러가기
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
