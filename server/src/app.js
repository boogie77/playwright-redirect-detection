const express = require("express");
const app = express();

const port = 3000;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/foo', (req, res) => {
  delay(2000).then(() => {
    res.redirect(307, '/secondJump')
  })
});

app.get('/secondJump', (req, res) => {
  delay(2000).then(() => {
    res.redirect(307, '/thirdJump')
  })
});

app.get('/thirdJump', (req, res) => {
  delay(2000).then(() => {
    res.redirect(307, '/bar')
  })
});

app.get('/bar', (req, res) => {
  delay(5000).then(() => {
    res.send('Hello, you are on /bar!');
  })
  
});

app.listen(port, () => {
  console.log(`Server started, listening on http://localhost:${port}`);
});
