import {Component} from "../../../../shared/model/component/component.js";


const component = {
    selector: 'app-one-answer-question-view',
    templatePath: 'lecturer-test/edit-test/one-answer-question-view/one-answer-question-view.component.html',
    stylePaths: ['lecturer-test/edit-test/one-answer-question-view/one-answer-question-view.component.css'],
};

export class OneAnswerQuestionViewComponent extends Component {
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
