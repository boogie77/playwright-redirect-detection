const express = require("express");
const app = express();

const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/foo', (req, res) => {
  res.redirect(307, '/bar')
});

app.get('/bar', (req, res) => {
  res.send('Hello, you are on /bar!');
});

app.listen(port, () => {
  console.log(`Server started, listening on http://localhost:${port}`);
});
