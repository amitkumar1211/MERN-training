// include node fs module
var fs = require('fs');
 
// appendFile function with filename, content and callback function
fs.appendFile('appended_file.txt', 'Learn Node FS Module append function to update existing file', function (err) {
  if (err) throw err;
  console.log('File is created successfully.');
});
