import axios from 'axios';
import style from './NewPostPage.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Session from 'react-session-api';

const NewPostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const post = async () => {
    if ((title === '') | (content === '')) {
      alert('내용을 입력하세요');
      return;
    }

    if (window.sessionStorage.getItem('user')) {
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/post`,
        {
          title: title,
          content: content,
          author: window.sessionStorage.getItem('user'),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: window.sessionStorage.getItem(
              `${window.sessionStorage.getItem('user')}_token`
            ),
            fuck: 'fcccc',
          },
        }
      );

      if (result.data.status === 'success') {
        navigate('/');
      } else if (result.data.status === 'token expired') {
        alert('토큰 만료로 인해 재 로그인이 필요합니다');
        window.sessionStorage.removeItem(
          `${window.sessionStorage.getItem('user')}_token`
        );
        window.sessionStorage.removeItem('user');
        navigate('/auth/login');
      }
    }
  };

  return (
    <div className={style.container}>
      <input
        className={style.input}
        type='text'
        placeholder='제목'
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        className={style.textarea}
        placeholder='내용'
        value={content}
        onChange={handleContentChange}
      />
      <div className={style.submit} onClick={post}>
        <span>글 올리기</span>
      </div>
    </div>
  );
};

export default NewPostPage;
