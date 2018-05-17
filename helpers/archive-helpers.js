var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  
  fs.readFile(exports.paths.list, (err, data) => {
    var listArray = data.toString().split('\n');
    callback(listArray);
  });
  
};

exports.isUrlInList = function(url, callback) {
  
  fs.readFile(exports.paths.list, (err, data) => {
    callback(_.contains(data.toString().split('\n'), url));
  });
};

exports.addUrlToList = function(url, callback) {
    
  fs.appendFile(exports.paths.list, '\n' + url, (err) => {
    if (err) {
      throw err;
    }
    callback();
  });
};

exports.isUrlArchived = function(url, callback) { 

  fs.readdir(exports.paths.archivedSites, (err, files) => {
    callback (_.some(files, file => file === url ));
  });
};

exports.downloadUrls = function(urls) {
  
  urls.forEach(url => {
    http.get('http://' + url, (res) => {
      
      var str = '';
      res.on('data', (chunk) => {
        str += chunk;
      }).on('end', () => {
        fs.writeFile(exports.paths.archivedSites + '/' + url, str, (err) => {
          if (err) {
            throw err;
          }
        });
      });
    });
  });
  
  
  
  
};
