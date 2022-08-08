let userInput: unknown; // we don't know what user will enter(number, string or whatever)
// we can store whatever there without returning errors
userInput = 5;
userInput = 'Max';

let userName: string;
//userName = userInput // will give us a compilation error because while unknown, we can't specify it is a string

// we can do some type checking though:
if (typeof userInput === 'string') {
    userName = userInput;
}

function generateError(message: string, code: number): never {
    throw { error: message, errorCode: code };
}

generateError('An error occured!', 500);