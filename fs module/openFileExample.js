// include node fs module
var fs = require('fs');
 
// open function with filename, file opening mode and callback function
fs.open('openfile.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('File is opened in write mode.');
});
