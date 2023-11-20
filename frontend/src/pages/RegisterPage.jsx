import { Link, useNavigate } from 'react-router-dom';
import style from './RegisterPage.module.css';
import { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPw(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const post = async () => {
    if ((id === '') | (pw === '') | (name === '')) {
      alert('내용을 입력하세요');
      return;
    }

    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      {
        id: id,
        pw: pw,
        name: name,
      }
    );

    if (result.data.status === 'success') {
      alert('회원가입 성공');
      navigate('/auth/login');
    } else {
      alert('아이디 중복');
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
        <input
          className={style.input}
          type='text'
          value={name}
          placeholder='이름'
          onChange={handleNameChange}
        />
      </div>
      <div className={style.btnWrap}>
        <div className={style.button} onClick={post}>
          회원가입
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
