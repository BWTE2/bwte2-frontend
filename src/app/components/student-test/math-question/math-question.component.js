import {Component} from "../../../shared/model/component/component.js";
import {domService} from "../../../shared/services/dom.service.js";
import {MQ} from "../../../app.module.js";


const component = {
    selector: 'app-math-question',
    templatePath: 'student-test/math-question/math-question.component.html',
    stylePaths: ['student-test/math-question/math-question.component.css',
        '../../app/shared/library/mathquill/mathquill.css'],
};

export class MathQuestionComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
    }

    onInit() {
        this.eventsInitializer();
        this.attributesInitializer();
    }

    attributesInitializer() {
        const question = domService.getAttribute(this, "questionInfo");

        this.loadQuestionWording(question);
        this.loadQuestionBody(question);
    }

    eventsInitializer() {
        const math_panel = this.dom.getElementById("math-panel");

        math_panel.addEventListener("mathSymbolAppear", (e) =>{
            let answerSpan = this.dom.getElementById("answer");
            MQ(answerSpan).cmd(e.detail);
        });
    }

    loadQuestionWording(question) {
        const textMath = question.questionText.split("\\MATH");

        const questionWordingElement = this.dom.getElementById("question-wording-element");
        const questionWording = {
            text: textMath[0], //question.questionText,
            points: question.points
        }

        let newText = document.createElement("p");
        newText.innerHTML = textMath[1];
        MQ.StaticMath(newText);
        this.dom.getElementById("math-exp").appendChild(newText);

        domService.setAttribute(questionWordingElement, "questionWording", questionWording);
    }

    loadQuestionBody(question) {
        let answerSpan = this.dom.getElementById('answer');
        let answerMathField = MQ.MathField(answerSpan, {
            handlers: {
                edit: function() {
                    let enteredMath = answerMathField.latex();
                }
            }
        });
    }

    getAnswer() {
        const studentAnswer= MQ( this.dom.getElementById("answer") ).latex();
        return studentAnswer;
    }
}