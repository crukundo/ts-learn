// classes, inheritance, getters, setters, singletons, abstract

abstract class Department {
    static fiscalYear = 2020;
    // private readonly id: string;
    // private name: string;
    protected employees: string[] = []; // private property ensures employees can only be added via a function local to Department class i.e addEmployee

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
    }

    static createEmployee(name: string) {
        return { name: name };
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log("Number of employees: ", this.employees.length);
        console.log("Number of employees: ", this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[]
    constructor(id: string, admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe() {
        console.log('IT Department: ', +this.id)
    }
}

class AccountsDepartment extends Department {
    private lastReport: string;
    // Make accounts department a singleton. Only one instance of this abstract class
    private static instance: AccountsDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No recent report!');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in valid value');
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounts');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountsDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountsDepartment('d2', []);
        return this.instance;
    }

    addEmployee(name: string) {
        if (name === 'Collin') {
            return
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    describe() {
        console.log('Account Department ID: ', + this.id)
    }
}

const employee1 = Department.createEmployee('Jeremy');
console.log(employee1, Department.fiscalYear);

const it = new ITDepartment('d1', ['Collin']);

it.addEmployee('Collin');
it.addEmployee('Peter');

// accounting.employees[2] = 'Anna'; // not a good way to add new employees

it.describe();
it.name = 'Nina IT'
it.printEmployeeInformation();
console.log(it);


// const accounts = new AccountsDepartment('d2', []);

const accounts = AccountsDepartment.getInstance();
const accounts2 = AccountsDepartment.getInstance();
console.log(accounts);
console.log(accounts2); // will give us the same instance as accounts above. Since only one instance possible.


accounts.mostRecentReport = 'Year End Report';

accounts.addReport('End of month report');

accounts.addEmployee('Collin');
accounts.addEmployee('Peter');
accounts.printReports();
accounts.printEmployeeInformation();
accounts.describe();