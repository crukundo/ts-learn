// Types for functions

function add(n1: number, n2: number): number {
    return n1 + n2;
}

function printResult(num: number): void {
    // this function doesn't return anything (no return statement), i.e type: void
    console.log('Result: ', +num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) { // passing void to tell typescript to ignore any return statements
    const result = n1 + n2;
    cb(result);
}

printResult(add(5, 12));

//let combinedValues: Function; // type: function // whaterver we store has to be a function

// lets make that better

let combinedValues: (a: number, b: number) => number; // combined values is of type function that accepts two number types and returns a number

combinedValues = add; // stored pointer of function in variable

//combinedValues = 5; // we'll get a runctime error because we reassigned CombinedValues to 5 if type any. By assigning type Function, we get an instant compilation error in IDE

//combinedValues = printResult; // we get undefined here because no return statement
console.log(combinedValues(8, 8));

addAndHandle(10, 20, (result) => {
    console.log(result);
});