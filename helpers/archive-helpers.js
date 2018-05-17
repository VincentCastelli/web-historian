var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  
};

exports.isUrlInList = function(url, callback) {
  // if url !== url on sites.txt
    // addUrlToList(url, readListOfUrls)
    
    
  
  fs.readFile(paths.list, (err, data) => {
    //if url is in list
    if(_.contains(data.toString().split('\n'), url)) {
      fs.readFile(paths.siteAssets + '/loading.html', (err, data) => {
        res.write(data);
        res.end();
      });
    // if url is not in list, add to list
    } else {
      addUrlToList(url, callback); //ADD CALLBACK
    }
    
  });
};

exports.addUrlToList = function(url, callback) {
  // get file
  // convert to array
  // push url to array
  // convert array back to text
  // write to list
  // render loading page
  fs.readFile(paths.list, (err, data) => {
    var listArray = data.toString().split('\n');
    listArray.push(url);
    var listString = listArray.join('\n');
    
    fs.writeFile(paths.list, listString, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });

    fs.readFile(paths.siteAssets + '/loading.html', (err, data) => {
        res.write(data);
        res.end();
    });
  });
};

exports.isUrlArchived = function(url, callback) { 
  // if url !== file in archivedSites
  fs.readdir(paths.archivedSites, (err, files) => {
    // if url in archive
    if (_.some(files, file => file === url)) {
      fs.readFile(paths.archivedSites + url, (err, data) => {
        res.write(data);
        res.end();
      });
    // if url not in archive
    } else {
      isUrlInList(url, callback); //ADD CALLBACK
    }
  }
};

exports.downloadUrls = function(urls) {
};
