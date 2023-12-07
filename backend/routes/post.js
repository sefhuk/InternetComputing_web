const express = require('express');
const connection = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', (req, res) => {
  connection.query(
    `SELECT *, DATE_FORMAT(created_at, '%Y/%m/%d %H:%i:%s') AS created_at FROM posts`,
    (err, result) => {
      if (result) {
        res.send(result);
      } else if (err) {
        res.send('서버에 장애가 발생했습니다');
      }
    }
  );
});

router.post('/', (req, res) => {
  const { authorization: token } = req.headers;
  const { title, content, author } = req.body;
  let docode;
  try {
    docode = jwt.verify(token, 'JWT_SECRET_KEY');
  } catch (e) {
    res.send({ status: 'token expired' });
    return;
  }

  connection.query(
    `INSERT INTO posts (title, content, author) VALUES ('${title}', '${content}', '${author}')`,
    (err, result) => {
      if (result) {
        res.send({ status: 'success' });
      } else if (err) {
        console.log(err);
        res.send({ status: 'failed' });
      }
    }
  );
});

router.put('/', (req, res) => {
  const { id, title, content } = req.body;

  connection.query(
    `UPDATE posts SET title = '${title}', content = '${content}' WHERE post_id = ${id}`,
    (err, result) => {
      if (result) {
        res.send({ status: 'success' });
      } else if (err) {
        res.send({ status: 'failed' });
      }
    }
  );
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    `SELECT *, DATE_FORMAT(created_at, '%Y/%m/%d %H:%i:%s') AS created_at FROM posts WHERE post_id = '${id}'`,
    (err, result) => {
      if (result) {
        const data = result[0];
        if (data !== undefined) {
          res.send({
            status: 'success',
            data: {
              title: data.title,
              content: data.content,
              author: data.author,
              created_at: data.created_at,
            },
          });
        } else {
          res.send({ status: 'failed' });
        }
      } else if (err) {
        res.send({ status: 'failed' });
      }
    }
  );
});

module.exports = router;
