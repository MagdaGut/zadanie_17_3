var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
let stringifyFile = '';

app.use(bodyParser.json());


app.get('/getNote', function (req, res) {
    fs.readFile('./test.json', 'utf8', function(err, data) {
        if (err) throw err;
        stringifyFile = data
        res.send(data);
    });
    console.log('Jesteśmy w getNote');
});

app.post('/updateNote/:note', function (req, res) {
    stringifyFile = req.params.note;
    fs.writeFile('./test.json', stringifyFile, function(err) {
        if (err) throw err;
        console.log('file updated');
        res.end();
    });
    console.log('Jesteśmy w updateNote/:note' + req.params.note);
});

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});

var server = app.listen(3000, function() {
    console.log('Przykładowa aplikacja nasłuchuje na http://localhost:3000');
});
