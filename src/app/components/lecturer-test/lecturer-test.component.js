import {Component} from "../../shared/model/component/component.js";
import {domService} from "../../shared/services/dom.service.js";
import {keyGeneratorService} from "../../api/key-generator/services/key-generator.service.js";


const component = {
    selector: 'app-lecturer-test',
    templatePath: 'lecturer-test/lecturer-test.component.html',
    stylePaths: ['lecturer-test/lecturer-test.component.css'],
};

export class LecturerTestComponent extends Component {
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

    }

    setName() {
        const actualName = "Lubos Sremanak";
        const sideMenu = this.dom.getElementById("side-menu");
        domService.setAttribute(sideMenu, "headerName", actualName);
    }


}
