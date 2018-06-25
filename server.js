var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var calculator = require("./calculator");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.post('/calculate', function(req, res) {
    var input = req.body.input;
    var state = req.body.calculatorState;

    var result = calculator.calculateNextState( state, input);

    console.log(typeof (result));
    res.json(result);

});

app.listen(3000, () => console.log('listening on port 3000!'));

