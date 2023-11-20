import axios from 'axios';
import style from './NewPostPage.module.css';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const NewPostPage = () => {
  const data = useLocation();

  const [title, setTitle] = useState(data.state.data.title);
  const [content, setContent] = useState(data.state.data.content);

  const navigate = useNavigate();

  const params = useParams();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const put = async () => {
    if ((title === '') | (content === '')) {
      alert('내용을 입력하세요.');
      return;
    }

    const result = await axios.put(`${process.env.REACT_APP_API_URL}/post`, {
      id: params.id,
      title: title,
      content: content,
    });

    if (result.data.status === 'success') {
      navigate('/');
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
      <div className={style.submit} onClick={put}>
        <span>글 수정하기</span>
      </div>
    </div>
  );
};

export default NewPostPage;
