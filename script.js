// Custom Error Classes
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

// Function to evaluate expression with error handling
function evalString(expression) {
  try {
    // Trim extra spaces
    expression = expression.trim();

    // Check for invalid characters
    if (/[^0-9+\-*/\s]/.test(expression)) {
      // Find the first invalid character
      const invalidChar = expression.match(/[^0-9+\-*/\s]/)[0];
      throw new OutOfRangeError(invalidChar);
    }

    // Check for invalid operator combinations (like ++, --, +*, etc.)
    if (/(\+\+|--|\+\*|\+\/|-\+|-\*|-\/|\*\+|\*-|\*\/|\/\+|\/-|\/\/|\*\*)/.test(expression)) {
      throw new InvalidExprError();
    }

    // Check if starts with invalid operator
    if (/^[+\/*]/.test(expression)) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    // Check if ends with invalid operator
    if (/[+\-/*]$/.test(expression)) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    // Evaluate the expression safely
    const result = eval(expression);
    console.log(result);
    return result;
  } catch (error) {
    console.error(`${error.name}: ${error.message}`);
  }
}
