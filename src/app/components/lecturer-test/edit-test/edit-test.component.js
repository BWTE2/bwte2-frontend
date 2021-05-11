import {Component} from "../../../shared/model/component/component.js";

const component = {
    selector: 'app-edit-test',
    templatePath: 'lecturer-test/edit-test/edit-test.component.html',
    stylePaths: ['lecturer-test/edit-test/edit-test.component.css'],
};

export class EditTestComponent extends Component {
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
