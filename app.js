const express = require('express');
const app = express();
const publicDir = express.static(`${__dirname}/dist`);

app.use(publicDir);

app.get('/', (req,res,next) => {
  res.render(`${estatico}/index.html`);
});

app.listen(8000);