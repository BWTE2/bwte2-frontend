import {Component} from "../../../shared/model/component/component.js";


const component = {
    selector: 'app-multiple-answer-question',
    templatePath: 'student-test/multiple-answer-question/multiple-answer-question.component.html',
    stylePaths: ['student-test/multiple-answer-question/multiple-answer-question.component.css'],
};

export class MultipleAnswerQuestionComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
    }

    onInit() {
        this.attributesInitializer();
        this.eventsInitializer();
    }

}
