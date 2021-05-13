import {Component} from "../../../../shared/model/component/component.js";
import {domService} from "../../../../shared/services/dom.service";

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
        const test = domService.getAttribute(this, "test");
        this.preloadPoints(test.question.points);
        this.loadQuestionWording(test.question);
    }

    eventsInitializer() {
    }

    preloadPoints(points) {
        const pointsEdit = this.dom.getElementById("points-edit");
        domService.setAttribute(pointsEdit, "points", null);
    }


    loadQuestionWording(question) {
        const questionWordingElement = this.dom.getElementById("question-wording-element");
        const questionWording = {
            text: question.text,
            points: question.maxPoints
        }
        domService.setAttribute(questionWordingElement, "questionWording", questionWording);
    }
}
