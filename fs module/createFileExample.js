// include node fs module
var fs = require('fs');
 
// writeFile function with filename, content and callback function
fs.writeFile('createFile.txt', 'Learn Node FS module', function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
});
