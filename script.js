//your code here
// Define custom error classes
class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
        this.name = "OutOfRangeError";
    }
}

class InvalidExprError extends Error {
    constructor() {
        super("Expression should not have an invalid combination of expression");
        this.name = "InvalidExprError";
    }
}

// Function to evaluate string expression
function evalString(expression) {
    try {
        // Trim spaces
        expression = expression.trim();

        //  Check for invalid characters
        if (/[^0-9+\-*/\s]/.test(expression)) {
            let invalidChar = expression.match(/[^0-9+\-*/\s]/)[0];
            throw new OutOfRangeError(invalidChar);
        }

        //  Check for invalid operator combinations
        if (/(\+\+|--|\*\*|\/\/|\+-|-\/|-\+|\+\/|\/\+|\*\+|\+\*|\/\*|\*\/)/.test(expression)) {
            throw new InvalidExprError();
        }

        //  Check for invalid start operator
        if (/^[+\/*]/.test(expression)) {
            throw new SyntaxError("Expression should not start with invalid operator");
        }

        //  Check for invalid end operator
        if (/[+\-/*]$/.test(expression)) {
            throw new SyntaxError("Expression should not end with invalid operator");
        }

        //  If all checks pass, evaluate safely
        let result = eval(expression);
        console.log(result);
        return result;

    } catch (error) {
        console.error(`${error.name}: ${error.message}`);
    }
}
