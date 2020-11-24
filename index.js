const express = require('express');
const bodyParser = require('body-parser');
const getSummary = require('./src/getSummary');
const writeFile = require('./src/utils/writeFile');
const getCasesByTeritory = require('./src/getCasesByTeritory');
const getAmbulances = require('./src/getAmbulances');

const app = express();

const port = process.env.PORT || 5002;

// support parsing of application/json type post data
app.use(bodyParser.json());

app.listen(port, async () => {
  console.log(`Main app listening on ${port}`)
  const summary = await getSummary();
  if (summary) {
    if (summary.daily) {
      const data = Object.values(summary.daily);
      writeFile('files/dailySummary.json', data)
    }
    if (summary.monthly) {
      const data = Object.values(summary.monthly);
      writeFile('files/monthlySummary.json', data)
    }
  }
  const casesByTerritory = await getCasesByTeritory();
  if (casesByTerritory) {
    writeFile('files/casesByTerritory.json', casesByTerritory)
  }
  const ambulances = await getAmbulances();
  if (ambulances) {
    writeFile('files/ambulances.json', ambulances)
  }
})  