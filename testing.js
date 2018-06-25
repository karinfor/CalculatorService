var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

var calculator = require('./calculator');
var assert = require('assert');

var port = process.env.PORT || 3000;

/*******************************************************************************************************************
 *
 * Unit Testing for calculateNextState() function
 * use mocha to test (in terminal go to file directory and write mocha calculatorTesting.js
 *
 ******************************************************************************************************************/


describe('unit testing calculateNextState function', () => {

    it('test sending a character as input', () => {
        let s = null;
        s = calculator.calculateNextState(s, "a");
        assert.equal(JSON.parse(s).display, "malformed expression");
    });

    it('test sending an operator as first input', () => {
        let s = null;
        s = calculator.calculateNextState(s, "*");
        assert.equal(JSON.parse(s).display, "malformed expression");
        s = null;
        s = calculator.calculateNextState(s, "+");
        assert.equal(JSON.parse(s).display, "0");
    });

    it('test multiple digits numbers', () => {
        let s = null;
        s = calculator.calculateNextState(s, "1");
        assert.equal(JSON.parse(s).display, "1");
        s = calculator.calculateNextState(s, "2");
        assert.equal(JSON.parse(s).display, "12");
    });

    it('test display after sending operator', () => {
        let s = null;
        s = calculator.calculateNextState(s, "3");
        assert.equal(JSON.parse(s).display, "3");
        s = calculator.calculateNextState(s, "+");
        assert.equal(JSON.parse(s).display, "3");
    });

    it('test operator after operator', () => {
        let s = null;
        s = calculator.calculateNextState(s, "3");
        assert.equal(JSON.parse(s).display, "3");
        s = calculator.calculateNextState(s, "+");
        assert.equal(JSON.parse(s).display, "3");
        s = calculator.calculateNextState(s, "*");
        assert.equal(JSON.parse(s).display, "malformed expression");
    });



    it('should verify simple operator', () => {
        let s = null;
        s = calculator.calculateNextState(s, "6");
        assert.equal(JSON.parse(s).display, "6");
        s = calculator.calculateNextState(s, "+");
        s = calculator.calculateNextState(s, "7");
        assert.equal(JSON.parse(s).display, "7");
        s = calculator.calculateNextState(s, "=");
        assert.equal(JSON.parse(s).display, "13");
    });

    it('should verify multiple operators', () => {
        let s = null;
        s = calculator.calculateNextState(s, "5");
        assert.equal(JSON.parse(s).display, "5");
        s = calculator.calculateNextState(s, "-");
        assert.equal(JSON.parse(s).display, "5");
        s = calculator.calculateNextState(s, "2");
        assert.equal(JSON.parse(s).display, "2");
        s = calculator.calculateNextState(s, "*");
        assert.equal(JSON.parse(s).display, "3");
        s = calculator.calculateNextState(s, "4");
        assert.equal(JSON.parse(s).display, "4");
        s = calculator.calculateNextState(s, "=");
        assert.equal(JSON.parse(s).display, "12");
    });

    it('test division by 0', () => {
        let s = null;
        s = calculator.calculateNextState(s, "5");
        assert.equal(JSON.parse(s).display, "5");
        s = calculator.calculateNextState(s, "/");
        assert.equal(JSON.parse(s).display, "5");
        s = calculator.calculateNextState(s, "0");
        assert.equal(JSON.parse(s).display, "0");
        s = calculator.calculateNextState(s, "=");
        assert.equal(JSON.parse(s).display, "division by zero is undefined");

    });

    it('test alot of operations', () => {
        let s = null;
        s = calculator.calculateNextState(s, "1");
        assert.equal(JSON.parse(s).display, "1");
        s = calculator.calculateNextState(s, "2");
        assert.equal(JSON.parse(s).display, "12");
        s = calculator.calculateNextState(s, "+");
        assert.equal(JSON.parse(s).display, "12");
        s = calculator.calculateNextState(s, "4");
        assert.equal(JSON.parse(s).display, "4");
        s = calculator.calculateNextState(s, "3");
        assert.equal(JSON.parse(s).display, "43");
        s = calculator.calculateNextState(s, "=");
        assert.equal(JSON.parse(s).display, "55");
        s = calculator.calculateNextState(s, "+");
        assert.equal(JSON.parse(s).display, "55");
        s = calculator.calculateNextState(s, "1");
        assert.equal(JSON.parse(s).display, "1");
        s = calculator.calculateNextState(s, "=");
        assert.equal(JSON.parse(s).display, "56");
    });

});


/*******************************************************************************************************************
 *
 * Interation Testing
 * start server and use mocha to test (in terminal go to file directory and write mocha calculatorTesting.js
 *
 ******************************************************************************************************************/
function testAsync(done, fn) {

    try {
        fn();
        done();
    } catch(err) {
        done(err);
    }
}

describe('Test REST api', function() {

    it('send digit to POST/calculate- should add digit to display', (done) => {

        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: null, input: "1"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    assert.equal("1", JSON.parse(res.body).display);
                    });
        });
    });

    it('send another digit to POST/calculate- should add digit to display' , (done) => {
        var jsonstate =  {preVal: "1", operator: null, currVal: "", display: "1"};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: JSON.stringify(jsonstate), input: "2"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.equal("12", JSON.parse(s).display);
                    });
            });
    });

    it('send an operation to POST/calculate - shold not change display', (done) => {
        var jsonstate =  {preVal: "12", operator: null, currVal: "", display: "12"};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: JSON.stringify(jsonstate), input: "+"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.equal("12", JSON.parse(s).display);
                });
            });
    });

    it('send a digit after operation to POST/calculate - should change display', (done) => {
        var jsonstate =  {preVal: "12", operator: "+", currVal: "", display: "12"};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: JSON.stringify(jsonstate), input: "3"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.equal("3", JSON.parse(s).display);
                });
            });
    });

    it('send another operation - should calculate last operation', (done) => {
        var jsonstate =  {preVal: "15", operator: "*", currVal: "", display: "15"};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: JSON.stringify(jsonstate), input: "/"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.equal("malformed expression", JSON.parse(s).display);
                });
            });
    });

    it('send operation after operation - should return error', (done) => {
        var jsonstate =  {preVal: "12", operator: "+", currVal: "3", display: "3"};
        chai.request("http://localhost:" + port)
            .post('/calculate')
            .send({calculatorState: JSON.stringify(jsonstate), input: "*"})
            .end((err, res) => {
                testAsync(done, function () {
                    expect(res).to.have.status(200);
                    var s = res.body;
                    assert.equal("15", JSON.parse(s).display);
                });
            });
    });


});

