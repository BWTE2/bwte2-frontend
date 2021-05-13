import {Component} from "../../shared/model/component/component.js";
import {domService} from "../../shared/services/dom.service.js";


const component = {
    selector: 'app-student-test',
    templatePath: 'student-test/student-test.component.html',
    stylePaths: ['student-test/student-test.component.css'],
};

export class StudentTestComponent extends Component {
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
        this.setName();
    }

    eventsInitializer() {
        const sideMenu = this.dom.getElementById("side-menu");
        sideMenu.addEventListener("sendTest", (e) => {
            console.log(e.detail);
        });
    }

    setName() {
        const actualName = "Lubos Sremanak";
        const sideMenu = this.dom.getElementById("side-menu");
        domService.setAttribute(sideMenu, "headerName", actualName);
    }

}
