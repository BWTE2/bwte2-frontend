import {Component} from "../../../../shared/model/component/component.js";
import {domService} from "../../../../shared/services/dom.service.js";
import {MQ} from "../../../../app.module.js";


const component = {
    selector: 'app-math-question-view',
    templatePath: 'lecturer-test/edit-test/math-question-view/math-question-view.component.html',
    stylePaths: ['lecturer-test/edit-test/math-question-view/math-question-view.component.css',
        '../../app/shared/library/mathquill/mathquill.css'],
};

export class MathQuestionViewComponent extends Component {
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
        this.questionId = test.question.id;

        this.preloadPoints(test.question.points, test.question.answer);
        this.loadQuestionWording(test.question);
    }

    eventsInitializer() {
    }

    preloadPoints(points, answer) {
        const pointsEdit = this.dom.getElementById("points-edit");
        domService.setAttribute(pointsEdit, "points", points);

        const answerBox = this.dom.getElementById("student-answer");
        answerBox.innerText = answer;
        MQ.StaticMath( answerBox );
    }

    loadQuestionWording(question) {
        const questionWordingElement = this.dom.getElementById("question-wording-element");
        const textMath = question.text.split("\\MATH");

        const questionWording = {
            text: textMath[0],
            points: question.maxPoints
        }

        let newText = document.createElement("p");
        newText.innerText= textMath[1];
        MQ.StaticMath(newText);
        this.dom.getElementById("math-exp").appendChild(newText);
        domService.setAttribute(questionWordingElement, "questionWording", questionWording);
    }

    getInfo() {
        const pointsEdit = this.dom.getElementById("points-edit");
        return {points: pointsEdit.getPoints(), questionId: this.questionId};
    }
}
