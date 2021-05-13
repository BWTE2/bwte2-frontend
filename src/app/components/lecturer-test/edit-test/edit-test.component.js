import {Component} from "../../../shared/model/component/component.js";
import {domService} from "../../../shared/services/dom.service.js";
import {testsService} from "../../../api/tests/services/tests.service.js";
import {MultipleAnswerQuestionViewComponent} from "./multiple-answer-question-view/multiple-answer-question-view.component.js";
import {OneAnswerQuestionViewComponent} from "./one-answer-question-view/one-answer-question-view.component.js";
import {PairQuestionViewComponent} from "./pair-question-view/pair-question-view.component.js";
import {DrawQuestionViewComponent} from "./draw-question-view/draw-question-view.component.js";

const component = {
    selector: 'app-edit-test',
    templatePath: 'lecturer-test/edit-test/edit-test.component.html',
    stylePaths: ['lecturer-test/edit-test/edit-test.component.css', '' +
    'student-test/student-test.component.css'],
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
        const studentTestId = domService.getAttribute(this, "studentTestId");
        testsService.readStudentTestAnswers(studentTestId.studentId, studentTestId.testCode).then(this.setTest);

    }

    appendQuestion(question) {
        const attribute = {name: "question", data: question};
        if (question.type === "CHOICE") {
            domService.appendDomAndSetAttribute(this.dom, MultipleAnswerQuestionViewComponent, attribute);
        } else if (question.type === "SHORT_ANSWER") {
            domService.appendDomAndSetAttribute(this.dom, OneAnswerQuestionViewComponent, attribute);
        } else if (question.type === "PAIR") {
            domService.appendDomAndSetAttribute(this.dom, PairQuestionViewComponent, attribute);
        } else if (question.type === "DRAW") {
            domService.appendDomAndSetAttribute(this.dom, DrawQuestionViewComponent, attribute);
        } else if (question.type === "MATH") {
            domService.appendDomAndSetAttribute(this.dom, MultipleAnswerQuestionViewComponent, attribute);
        }
    }

    eventsInitializer() {
    }

    setTest = (test) => {
        test.response.questions.forEach((questionWithAnswer) => {
            console.log(questionWithAnswer.studentQuestionAnswer);
        })
    };
}

