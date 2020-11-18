const express = require('express');
const bodyParser = require('body-parser');
const getSummary = require('./src/getSummary');
const writeFile = require('./src/utils/writeFile');

const app = express();

const port = process.env.PORT || 5002;

// support parsing of application/json type post data
app.use(bodyParser.json());

app.listen(port, async () => {
  console.log(`Main app listening on ${port}`)
  const summary = await getSummary();
  if (summary) {
    writeFile('files/summary.json', summary)
  }
})  