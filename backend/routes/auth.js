const { response } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../db');
const router = express.Router();
require('dotenv').config();

router.post('/register', (req, res) => {
  const { id, pw, name } = req.body;

  connection.query(
    `SELECT * FROM users WHERE username = '${id}'`,
    (err, result) => {
      if ((result.length !== 0) | err) {
        res.send({ status: 'failed' });
      } else {
        connection.query(
          `INSERT INTO users (username, password, name) VALUES ('${id}', '${pw}', '${name}')`,
          (err, result) => {
            if (result) {
              res.send({ status: 'success' });
            }
            if (err) {
              res.send({ status: 'failed' });
            }
          }
        );
      }
    }
  );
});

router.post('/login', (req, res) => {
  const { id, pw } = req.body;

  connection.query(
    `SELECT * FROM users WHERE username = '${id}' AND password = '${pw}'`,
    (err, result) => {
      if (result.length === 0 || err) {
        res.send({ status: 'failed' });
      } else {
        const accessToken = jwt.sign({ id: id }, 'JWT_SECRET_KEY', {
          expiresIn: '30m',
        });
        res.send({ status: 'success', token: accessToken });
      }
    }
  );
});

module.exports = router;
