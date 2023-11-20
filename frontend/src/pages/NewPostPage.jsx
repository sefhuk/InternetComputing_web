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

    if (Session.get('user')) {
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/post`, {
        title: title,
        content: content,
        author: Session.get('user'),
      });

      if (result.data.status === 'success') {
        navigate('/');
      }
    } else {
      alert('세션 종료로 인해 로그인이 필요합니다');
      navigate('/auth/login');
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
