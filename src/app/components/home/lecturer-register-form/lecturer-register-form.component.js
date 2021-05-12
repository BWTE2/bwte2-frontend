import {Component} from "../../../shared/model/component/component.js";

const component = {
    selector: 'app-lecturer-register-form',
    templatePath: 'home/lecturer-register-form/lecturer-register-form.component.html',
    stylePaths: ['home/lecturer-login-form/lecturer-login-form.component.css'],
};

export class LecturerRegisterFormComponent extends Component {
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

    eventsInitializer()
    {
        let registerButton = this.dom.getElementById("lecturer-register-button");

        registerButton.addEventListener("click", () => {
            this.validateAndRegisterLecturer();
        });

    }

    validateAndRegisterLecturer()
    {
        if(this.isFilledInput())
        {
            this.registerLecturer();
        }
    }




}
