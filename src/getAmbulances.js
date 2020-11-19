const makeRequest = require('./utils/makeRequest');
const endpoint = 'https://covid19.data.gov.rs/api/datasets/ambulances';
module.exports = async function getCasesByTeritory() {
  const fileContent = await makeRequest(endpoint).then(res => JSON.parse(res)).catch(err => null);
  if (!fileContent) {
    return null;
  }
  const fetchTime = new Date().getTime();
  const result = {
    fetchTime,
    data: fileContent,
  };
  return result;
}