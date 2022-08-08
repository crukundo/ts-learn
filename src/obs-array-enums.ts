// Core types: number, string, boolean, object, array, tuple, enum

// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string];
// } = {
//     name: 'Collin',
//     age: 28,
//     hobbies: ['Bitcoin', 'Cooking'],
//     role: [2, 'Engineer']
// };

// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

enum Role { ADMIN = 'ADMIN', READ_ONLY = 100, AUTHOR = 'AUTHOR' };

const person = {
    name: 'Collin',
    age: 28,
    hobbies: ['Bitcoin', 'Cooking'],
    role: Role.ADMIN
};

let favoriteActivities: string[];
favoriteActivities: ['Sports'];

// person.role.push('admin');
// person.role[1] = 10;
// person.role = [0, 'admin', 'user'];

console.log(person.name);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase()); // shows you TS respects inferred type e.g string. 
}