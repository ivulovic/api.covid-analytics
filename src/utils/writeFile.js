const fs = require('fs');

module.exports = function writeFile(fileName, data) {
  fs.writeFile(fileName, JSON.stringify(data), function (err) {
    if (err) throw err;
    console.log(`Done with writing data to the ${fileName}`);
  }
  );
}