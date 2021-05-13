import {Component} from "../../../shared/model/component/component.js";


const component = {
    selector: 'app-one-answer-question',
    templatePath: 'student-test/one-answer-question/one-answer-question.component.html',
    stylePaths: ['student-test/one-answer-question/one-answer-question.component.css'],
};

export class OneAnswerQuestionComponent extends Component {
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
