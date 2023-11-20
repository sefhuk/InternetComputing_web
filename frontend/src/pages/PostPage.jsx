import axios from 'axios';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from './PostPage.module.css';

const PostPage = () => {
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
    navigate('edit', { state: post });
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
      <p className={style.author}>작성자 : {post.data.author}</p>
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
