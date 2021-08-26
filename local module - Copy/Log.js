var log = {
            info: function (message) { 
                console.log('Info: ' + message);
            },
            warning:function (message) { 
                console.log('Warning: ' + message);
            },
            error:function (message) { 
                console.log('Error: ' + message);
            }
    };
module.exports = log
