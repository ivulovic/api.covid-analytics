// module.exports = function ({ url, options = { method: 'GET', port: 443 } }) {
//   let result;
//   console.log(url)
//   const { pathname: path, host } = new URL(url);

//   const req = https.request({
//     ...options,
//     host,
//     path
//   }, res => {
//     let bufferData = '';
//     res.on('data', chunk => {
//       bufferData += chunk;
//     })
//     res.on('end', () => {
//       result = JSON.parse(bufferData);
//     })
//     return result;
//   })
//   req.on('error', error => {
//     console.error(error)
//   })

//   req.end()
// }

const makeRequest = function (url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};

module.exports = makeRequest;