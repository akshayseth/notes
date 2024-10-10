const Hawk = require('@hapi/hawk');
require('dotenv').config()

// Client credentials
const credentials = {
      id: process.env.HAWK_ID,
      key: process.env.HAWK_SECRET, // Hawk Secret Key
      algorithm: 'sha256',
};

// Generate Hawk authorization header
const { header, artifacts } = Hawk.client.header('http://localhost:3000/api/notes/4', 'PUT', {
      credentials,
      payload: JSON.stringify({
            title: 'My First Note',
            body: 'This is the content of my note.'
      }),
      contentType: 'application/json',
});

console.log('Generated Authorization Header:', header);
