const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/account'));

app.listen(process.env.PORT || 8000);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/account/src/index.html'));
});

console.log('console listening');
