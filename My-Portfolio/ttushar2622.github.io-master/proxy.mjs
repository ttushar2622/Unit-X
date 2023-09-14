// const express = require('express');
import express from 'express'
import fetch from 'node-fetch';

// Your code here


const app = express();
const port = 3000;

app.use(express.json());

app.get('/github', async (req, res) => {
  const username = req.query.user;
  try {
    const response = await fetch(`https://your-proxy.com/github?user=${username}`);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
