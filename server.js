const express = require('express');
const path = require('path');
const api = require('./routes/notes.js')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

//GET route for homepage
app.get('/', (req, res) =>
 res.sendFile(path.join(__dirname, '/public/index.html'))
);


//GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Get route 404
app.get('*', (req, res) =>
  res.status(404).sendFile(path.join(__dirname, '/public/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);