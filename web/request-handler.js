var path = require('path');
var archive = require('../helpers/archive-helpers');
var headersCor = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // Get
  var statusCode;
  if (req.method === 'GET') {
 
    // if url is '/'
    if (req.url === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', (err, data) => {
        if (err) {
          statusCode = 404;
          res.writeHead(statusCode, headersCor.headers);
          res.end();
        } else {
          statusCode = 200;
          res.writeHead(statusCode, headersCor.headers);
          res.write(data);
          res.end();
        }
    }) 
    } else {
      fs.readFile(archive.paths.archivedSites + req.url, (err, data) => {
        if (err) {
          statusCode = 404;
          res.writeHead(statusCode, headersCor.headers);
          res.end();
        } else {
          statusCode = 200;
          res.writeHead(statusCode, headersCor.headers);
          res.write(data);
          res.end();
        }
      })
    }  
  }
  
  // Post
  
  if (req.method === 'POST') {
    statusCode = 302;
    res.writeHead(statusCode, headersCor.headers);
  }
  
};