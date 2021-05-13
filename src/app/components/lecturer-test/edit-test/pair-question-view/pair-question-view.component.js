import {Component} from "../../../../shared/model/component/component.js";

const component = {
    selector: 'app-pair-question-view',
    templatePath: 'lecturer-test/edit-test/pair-question-view/pair-question-view.component.html',
    stylePaths: ['lecturer-test/edit-test/pair-question-view/pair-question-view.component.css'],
};

export class PairQuestionViewComponent extends Component {
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
