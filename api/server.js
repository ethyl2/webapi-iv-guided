const express = require('express');
const helmet = require('helmet');

const Shoutouts = require('../data/shoutouts-model.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', logger, (req, res) => {
  Shoutouts.find()
  .then(shoutouts => {
    res.status(200).json(shoutouts);
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the shoutouts' });
  });
});

server.get('/motd', logger, (req, res) => {
  const messageOfTheDay = process.env.MOTD || 'Sunlight is painting. -Nathaniel Hawthorne';
  Shoutouts.find()
  .then(shoutouts => {
    res.status(200).json({shoutouts, "motd": messageOfTheDay});
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the shoutouts' });
  });
});



server.post('/', logger, (req, res) => {
  Shoutouts.add(req.body)
  .then(shoutout => {
    res.status(201).json(shoutout);
  })
  .catch (error => {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot add the shoutout' });
  });
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('host')}`
  );
  next();
}

module.exports = server;
