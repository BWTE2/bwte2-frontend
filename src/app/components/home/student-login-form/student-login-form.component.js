import {Component} from "../../../shared/model/component/component.js";


const component = {
    selector: 'app-student-login-form',
    templatePath: 'home/student-login-form/student-login-form.component.html',
    stylePaths: ['home/lecturer-login-form/lecturer-login-form.component.css'],
};

export class StudentLoginFormComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
    }

    onInit() {
        this.attributesInitializer();
        this.eventsInitializer();
    }

    attributesInitializer() {

    }

    eventsInitializer() {

    }
}
