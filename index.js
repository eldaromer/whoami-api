var express = require('express');
var app = express();

var path = require('path');

var morgan = require('morgan');

app.use(morgan('dev'));

var getSoftware = function (software) {
    
    var fin = "";
    
    var checked = false;
    var record = false;
    
    for (var i = 0; i < software.length; i++) {
        
        if (!checked && software.charAt(i) == ')') {
            checked = true;
            record = false;
        }
        
        if (record) {
            fin+=software[i];
        }
        
        if (!checked && software.charAt(i) == '(') {
            record = true;
        }
    }
    
    return fin;
}

app.get('/api/whoami', function(req, res) {
    
    var result = {};
    
    result.ipaddress = req.headers['x-forwarded-for'];
    result.language = req.headers['accept-language'].substring(0, req.headers['accept-language'].indexOf(','));
    result.software = getSoftware(req.headers['user-agent']);
    
    res.send(result);
    
    console.log(req.headers);
    
})

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.get('*', function(req, res) {
    res.redirect('/');
});

app.listen(8080);