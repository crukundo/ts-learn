// Generics
// const names: Array<string> = []; // we need to define the array type e.g as string so typescript can enforce string things

// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Completed!');
//     }, 2000);
// }); 

// promise.then(data => {
//     data.split(' ');
// })

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: 'Collin', hobbies: ['Bitcoin'] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value!';
    if (element.length === 1) {
        descriptionText = 'Got 1 element'
    } else if (element.length > 0) {
        descriptionText = 'Got ' + element.length + ' elements'
    }
    return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}
console.log(extractAndConvert({ name: 'Collin' }, 'name'));

// A generic class: Flexible classes. 
class DataStorage<T extends string | number | boolean> { // won't work well with object types
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Collin');
textStorage.addItem('Rukundo');
textStorage.removeItem('Collin');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number | string>();

// const objStorage = new DataStorage<object>();

// objStorage.addItem({ name: 'Collin' });
// objStorage.addItem({ name: 'Rukundo' });

// objStorage.removeItem({ name: 'Collin' }); // will fail for objects and still return Collin because of indexOf.
// console.log(objStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

// Partial Generic Utility Type
function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;

    return courseGoal as CourseGoal;
}

// Readonly Generic Utility Type
const names: Readonly<string[]> = ['Rukundo', 'Niina'];
//names.push('Collin'); // won't work because object is readonly.
//names.pop('Rukundo'); // won't work because object is readonly.