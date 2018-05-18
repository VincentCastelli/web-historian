// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

// exports.workerHtml = function () {
//   // setInterval(function () {
//     console.log('fetching now');
archive.readListOfUrls(archive.downloadUrls);
// }, 10000);
// };  
