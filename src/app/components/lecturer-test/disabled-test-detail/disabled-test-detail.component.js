import {Component} from "../../../shared/model/component/component";

const component = {
    selector: 'app-disabled-test-detail',
    templatePath: 'lecturer-test/disabled-test-detail/disabled-test-detail.component.html',
    stylePaths: ['lecturer-test/disabled-test-detail/disabled-test-detail.component.css'],
};

export class DisabledTestDetailComponent extends Component {
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
