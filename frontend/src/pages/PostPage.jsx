import axios from 'axios';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './PostPage.module.css';
import { useRef } from 'react';
import Session from 'react-session-api';

const PostPage = () => {
  const authorRef = useRef();
  const navigate = useNavigate();
  const params = useParams();

  const getPost = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/${params.id}`
    );
    return result.data;
  };

  const { data: post, isLoading } = useQuery('post', getPost);

  const handleEdit = () => {
    // if (post.data.author === Session.get('user')) {
    if (post.data.author === window.sessionStorage.getItem('user')) {
      navigate('edit', { state: post });
    } else {
      alert('본인의 게시물만 수정이 가능합니다.');
      return;
    }
  };

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  if (post.status === 'failed') {
    return <h1>존재하지 않는 페이지</h1>;
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>{post.data.title}</h1>
      <p className={style.author} ref={authorRef}>
        작성자 : {post.data.author}
      </p>
      <p className={style.content}>{post.data.content}</p>
      <div className={style.btnContainer}>
        <Link className={`${style.button} ${style.back}`} to={'/'}>
          돌아가기
        </Link>
        <div className={`${style.button} ${style.edit}`} onClick={handleEdit}>
          수정하기
        </div>
      </div>
    </div>
  );
};

export default PostPage;
