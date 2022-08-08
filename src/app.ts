// type AddFn = (a: number, b: number) => number;


// Interface as a function type
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name?: string;
    outputName?: string; // question mark makes the property optional.
}

interface Greetable extends Named {

    greet(phrase: string): void;
}

class Person implements Greetable {// btw you can implement multiple interfaces, separate with comma
    name?: string;
    age = 30;

    constructor(n?: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        }
        console.log('Hello!');
    }
}

let user1: Greetable;

user1 = new Person('Collin Rukundo');
// user1.name = 'Rukundo' // won't work because name is set to readonly. So compilation error.

user1.greet('Hi there - I am');
console.log(user1);