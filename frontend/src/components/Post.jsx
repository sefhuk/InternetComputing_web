import style from './Post.module.css';
import { Link } from 'react-router-dom';

const Post = (props) => {
  const date = new Date(props.created_at);

  return (
    <Link className={style.container} to={`/post/${props.id}`}>
      <div className={style.wrap1}>
        <h2 className={style.title}>{props.title}</h2>
        <p className={style.content}>{props.content}</p>
      </div>
      <div className={style.wrap2}>
        <p className={style.author}>{props.author} </p>
        <p>{`${date.getFullYear()}.${
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : '0' + date.getMonth() + 1
        }.${date.getDate()} ${date.getHours()}:${
          date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
        }`}</p>
      </div>
    </Link>
  );
};

export default Post;
