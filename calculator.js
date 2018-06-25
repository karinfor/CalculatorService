// if the last input was an operator, meaning operator!=null, then add input to currVal
//if operator = null, ADD to prev
//if the last input was a number, add input to currVal using: currVal = currVal*10 + input
//if the input is an operator
// if the last input was a number, and operator!=null
// we need to calculte prev operator --> preVal = preval operator currval, operator  = newoperator, curr = 0.
// if the newoperator  "=" then do the caluation but, operator = null
// if the last input was an operator (not "=") and we got another operator
//if the newoperator = "+","-" then its the sign of the number and it's ok, in case it's a
// minus we need to currVal*=-1 after we recieve a new number;so we can think of ot as strings and just cancat appaend
//if he new operator is "*", '/' or '=' then display = "malformes expression" and make everything null
module.exports = {
    calculateNextState: function calculateNextState(jsonState, input) {
        //first input: we need to recieve null in jsonstate
        //when null recieves, nullify everything
        //if prev=null but jsonstate isn't -> display = "bad init"
        //can be an operator in case it "-" or "+", if it's minus, append to prevVal
        //other cation: "malformed expression"
        //number - appand to prev

        if (jsonState != null) {
            strState = JSON.parse(jsonState)
        }
        //takecare if number after = to delete prev
        if (jsonState == null) {
            //createstrState
            var newState = {"preVal": null, "operator": null, "currVal": "", "display": ""};

            //if input is a number (digit)
            if (/^\d$/.test(input)) {
                newState.preVal = input;
                newState.display = input;
            }
            else if ((input == "+") || (input == "-")) {
                newState.preVal += input;
                newState.display = 0;
            }
            else // input is invalid
            {
                newState.display = "malformed expression";
            }
            return JSON.stringify(newState);
        }

        if (strState.preVal == null) {
            //problem
            strState.display = "problem with state";
            return JSON.stringify(strState);
        }

        //if input is a number (digit)
        if (/^\d$/.test(input)) {
            if (strState.operator == null) {
                strState.preVal += input;
                strState.display = strState.preVal;
            }
            else {
                strState.currVal += input;
                strState.display = strState.currVal;
            }
        }
        else if ((input == "+") || (input == "-") || (input == "/") || (input == "*") || (input == "="))// input is an operator
        {
            if (strState.operator == null) {
                if (input == "=") {
                    //do nothing
                }
                else {
                    strState.operator = input;
                }
                //display doesnot change

            }
            else //operator is not null
            {
                //operator after operator
                if (strState.currVal == "") {
                    if ((input == "+") || (input == "-")) //input is sign not operator
                    {
                        strState.currVal = input;
                        strState.display = "0";
                    }
                    else //operator after operator
                    {
                        strState.display = "malformed expression";
                        return JSON.stringify(strState);
                    }
                }
                else //need to calculate last operator
                {
                    //calculate operator(preVal,currVal) into preVal, nullify operator and currVal

                    var prev = parseInt(strState.preVal);
                    var curr = parseInt(strState.currVal);
                    switch (strState.operator) {
                        case "-":
                            prev -= curr;
                            break;
                        case "+":
                            prev += curr;
                            break;
                        case "*":
                            prev *= curr;
                            break;
                        case "/":
                            if (curr == 0) {
                                strState.display = "division by zero is undefined";
                                return JSON.stringify(strState);
                            }
                            else {
                                prev /= curr;
                            }
                            break;
                    }
                    if (input == "=") {
                        strState.operator = null;
                    }
                    else {
                        strState.operator = input;
                    }
                    strState.display = prev.toString();
                    strState.preVal = prev.toString();
                    strState.currVal = "";
                }
            }

        }
        // TODO!!! return JSON.stringify(state)
        return JSON.stringify(strState);
    }
}
/*
let s = null;
s = calculateNextState(s,"1");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"5");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"+");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"4");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"2");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"=");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"*");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"2");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"3");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"-");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"2");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"=");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"-");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"-");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"2");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"=");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"/");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"2");
console.log(JSON.parse(s).display);
s = calculateNextState(s,"=");
console.log(JSON.parse(s).display);
*/
