// Type guards: Check if property or object exists before using

type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Collin',
    privileges: ['create-server'],
    startDate: new Date()
}

// some union types
type Combinable = string | number;
type Numeric = number | boolean

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
    // example of a type guard: typeof
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }
    return a + b;
}

type unknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: unknownEmployee) {
    console.log('Name: ' + emp.name);
    // a different type of type guard:
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start date: ' + emp.startDate);
    }
}

printEmployeeInformation(e1);
// create employee with object and leave out privileges to check type guard
printEmployeeInformation({ name: 'Jeremy', startDate: new Date() });

class Car {
    drive() {
        console.log('Driving...');
    }
}

class Truck {
    drive() {
        console.log('Driving a truck');
    }

    loadCargo(amount: number) {
        console.log('Loading cargo...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // check if function exists on Vehicle class
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1000);
    }
    // another way to check if the Class instance in question is one of type Truck. This won't work on Interfaces
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Unions

interface Bird {
    type: 'bird'; // not an assignment but a literal type
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    // this would work but would require a lot of checks.
    // if ('flyingSpeed' in animal) {
    //     console.log('Moving with speed: ' + animal.flyingSpeed);
    // }
    let speed;
    switch (animal.type) { // gives us 100% type safety by checking type literals.
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10 });

// Type Casting

const userInputElement = document.getElementById('user-input')!;
// Currently TS has no way of knowing that this is an input element as it doesn't review HTML. So 
// we added a ! to the end of the getElementById to tell TS we are sure it's not NULL. But we also have to justify userInputElement having a property of value
// so to fix that we do:
const userInputElement1 = <HTMLInputElement>document.getElementById('user-input'); // <HTMLInputElement> is a typecast to affirm type
userInputElement1.value = 'Hi there!';

const userInputElement2 = document.getElementById('user-input') as HTMLInputElement // This would work well in React where components are similar to the above format.
userInputElement2.value = 'Hi there!';

// the above would be better written as:
const userInputElement3 = document.getElementById('user-input');
if (userInputElement3) {
    (userInputElement3 as HTMLInputElement).value = 'Hi there!';
}