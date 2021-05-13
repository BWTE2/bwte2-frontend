import {Component} from "../../../../shared/model/component/component.js";

const component = {
    selector: 'app-multiple-answer-question-view',
    templatePath: 'lecturer-test/edit-test/multiple-answer-question-view/multiple-answer-question-view.component.html',
    stylePaths: ['lecturer-test/edit-test/multiple-answer-question-view/multiple-answer-question-view.component.css',
        'student-test/multiple-answer-question/multiple-answer-question.component.css'],
};

export class MultipleAnswerQuestionViewComponent extends Component {
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
