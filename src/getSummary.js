var fs = require('fs');
const https = require('https');
const makeRequest = require('./utils/makeRequest');
const summaryEndpoint = 'https://data.gov.rs/api/1/datasets/covid-19-dnevni-izveshtaj-o-epidemioloshkoj-situatsiji-u-republitsi-srbiji/';
module.exports = async function getSummary() {
  const txtFileURL = await makeRequest(summaryEndpoint).then(res => JSON.parse(res)).then(res => res.resources[0].url);
  const fileContent = await makeRequest(txtFileURL).then(txt => txt.split('\n'));
  if (!fileContent) return null;
  const fetchTime = new Date().getTime();
  const result = {
    fetchTime,
    data: [],
  };
  const createRecord = ([code, countryCode, day, month, year, value, description]) => ({ code, countryCode, date: `${year}-${month}-${day}`, value: value.length ? Number(value) : null, description })
  fileContent.forEach((row, i) => {
    if (i === 0) {
      return;
    }
    result.data.push(createRecord(row.split(',')));
  })
  return result;
}