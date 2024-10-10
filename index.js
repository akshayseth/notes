const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const Hawk = require('@hapi/hawk');
const app = express();
const prisma = new PrismaClient();
require('dotenv').config()

// In-memory credentials storage (replace this with a proper database/store if needed)
const credentials = {
  [process.env.HAWK_ID]: {
    id: process.env.HAWK_ID,
    key: process.env.HAWK_SECRET, // Hawk Secret Key
    algorithm: 'sha256', // Hashing algorithm
//     user: 'Steve',
  },
};

// Credentials lookup function for Hawk
const credentialsFunc = async function (id) {
  const credential = credentials[id];
  if (!credential) {
    throw new Error('Credentials not found');
  }
  return credential;
};

// Middleware for Hawk authentication
const authenticate = async (req, res, next) => {
  try {
    const { credentials, artifacts } = await Hawk.server.authenticate(req, credentialsFunc);
    req.credentials = credentials; // Attach the credentials to the request for future use
    req.artifacts = artifacts; // Attach the Hawk artifacts if needed
    next();
  } catch (error) {
    console.error('Hawk Authentication Error:', error.message);
    return res.status(401).json({ error: 'Invalid Hawk credentials' });
  }
};

app.use(bodyParser.json());

// Create a new note (Hawk-authenticated route)
app.post('/api/notes', authenticate, async (req, res) => {
  const { title, body } = req.body;
  const note = await prisma.note.create({
    data: { title, body },
  });
  res.json(note);
});

// Get all notes (Hawk-authenticated route)
app.get('/api/notes', authenticate, async (req, res) => {
  const notes = await prisma.note.findMany();
  res.json(notes);
});

// Update a note (Hawk-authenticated route)
app.put('/api/notes/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  const note = await prisma.note.update({
    where: { id: parseInt(id) },
    data: { title, body },
  });
  res.json(note);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
