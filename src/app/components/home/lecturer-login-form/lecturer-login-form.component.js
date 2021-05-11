import {Component} from "../../../shared/model/component/component.js";
import {LecturerRegisterFormComponent} from "../lecturer-register-form/lecturer-register-form.component.js";
import {domService} from "../../../shared/services/dom.service.js";

const component = {
    selector: 'app-lecturer-login-form',
    templatePath: 'home/lecturer-login-form/lecturer-login-form.component.html',
    stylePaths: ['home/lecturer-login-form/lecturer-login-form.component.css'],
};

export class LecturerLoginFormComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
    }

    onInit() {
        this.attributesInitializer();
        this.eventsInitializer();
        const lecturerRegisterButton = this.dom.getElementById("register-link");
        lecturerRegisterButton.addEventListener("click", () => this.lecturerRegisterButtonClick(this.dom));
    }

    attributesInitializer() {

    }

    eventsInitializer() {

    }

    lecturerRegisterButtonClick(dom) {
        const form = dom.getElementById("home-form");
        domService.changeDom(form, LecturerRegisterFormComponent);
        form.scrollIntoView();
    }
}
