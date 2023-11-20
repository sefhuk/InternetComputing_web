import style from './PostList.module.css';
import Post from './Post';
import axios from 'axios';
import { useQuery } from 'react-query';

const getPosts = async () => {
  const result = await axios.get(`${process.env.REACT_APP_API_URL}/post`);
  return result.data.reverse();
};

const PostList = () => {
  const { data: posts, isLoading } = useQuery('posts', getPosts);

  if (isLoading) {
    return (
      <div>
        <p>게시물 로딩중..</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      {posts.map((e, idx) => (
        <Post
          title={e.title}
          content={e.content}
          author={e.author}
          created_at={e.created_at}
          id={posts.length - idx}
        />
      ))}
    </div>
  );
};

export default PostList;
