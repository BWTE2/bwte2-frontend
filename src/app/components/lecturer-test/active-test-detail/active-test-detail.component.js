import {Component} from "../../../shared/model/component/component.js";


const component = {
    selector: 'app-active-test-detail',
    templatePath: 'lecturer-test/active-test-detail/active-test-detail.component.html',
    stylePaths: ['lecturer-test/active-test-detail/active-test-detail.component.css'],
};

export class ActiveTestDetailComponent extends Component {
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
