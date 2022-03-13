const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/fiscaly-a'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/fiscaly-a/index.html'));});
app.listen(process.env.PORT || 8080);
