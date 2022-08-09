// 7. Project Type Class

enum ProjectStatus { Active, Finished }

class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {

    }
}

// 5. State Management Class: Listen for changes on classes and implement

type Listener = (items: Project[]) => void;

class ProjectState {
    private listeners: Listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {

    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); //slice to return a copy of the projects array and not the original.
        }
    }
}

// 6. Create global instance of projec state

const projectState = ProjectState.getInstance();

//3. Create reusable validation function
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true; // hypothesis. Assuming it's valid at beginning

    // check one: does the required input have some values
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0; // since true initially, and if all after && is false will equal False
    }

    // check that minimum Length checks out
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength; // since true initially, and if all after && is false will equal False
    }
    // check that maximum Length checks out
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength; // since true initially, and if all after && is false will equal False
    }
    // check if min people required checks out
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    // check if max people required checks out
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    // deduce based on the above checks
    return isValid;
}

// 2. an autobind decorator: fixes the bind problem on submitHandler()
function autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };

    return adjDescriptor;
}

//4. Project List Class
class ProjectList {
    templateListElement: HTMLTemplateElement; //<tempalate id="project-input">...</template>
    hostElement: HTMLDivElement; // <div id="app"></div>
    listSectionElement: HTMLElement; // <div id="app"></div>
    assignedProjects: Project[];


    constructor(private type: 'active' | 'finished') {
        this.templateListElement = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        this.assignedProjects = [];

        // get the content in the <template> tag
        const listTemplateContent = document.importNode(this.templateListElement.content, true);
        this.listSectionElement = listTemplateContent.firstElementChild as HTMLElement;
        this.listSectionElement.id = `$ {this.type}-projects`

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });

        this.attachList();
        this.renderListContent();

    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type} - projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = projectItem.title;
            listEl.appendChild(listItem);
        }
    }

    private renderListContent() {
        const listId = `${this.type} - projects-list`;
        this.listSectionElement.querySelector('ul')!.id = listId;
        this.listSectionElement.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private attachList() {
        // insert html element in the app div
        this.hostElement.insertAdjacentElement('beforeend', this.listSectionElement);
    }
}

// 1. Project Input Class
class ProjectInput {
    templateElement: HTMLTemplateElement; //<tempalate id="project-input">...</template>
    hostElement: HTMLDivElement; // <div id="app"></div>
    formElement: HTMLFormElement; // <form>...</form>
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        // get the content in the <template> tag
        const mainTemplateContent = document.importNode(this.templateElement.content, true);
        this.formElement = mainTemplateContent.firstElementChild as HTMLFormElement;
        this.formElement.id = 'user-input';

        this.titleInputElement = this.formElement.querySelector('#title')!
        this.descriptionInputElement = this.formElement.querySelector('#description')!
        this.peopleInputElement = this.formElement.querySelector('#people')!

        this.configureSubmit();
        this.attachForm();
    }

    private getUserInput(): [string, string, number] | void { // returns a tuple with 3 elements in these types
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        // set our validation logic
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
        };

        // run the checks. if any is false, show alert
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, try again!')
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }


    }

    // clear inputs on form submission
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        // check that we have a tuple. Tuples are arrays
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            // use our static state
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }

    private configureSubmit() {
        // trigger submitHandler function whenever form submitted
        this.formElement.addEventListener('submit', this.submitHandler.bind(this));
    }

    private attachForm() {
        // insert html element in the app div
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement)
    }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');

