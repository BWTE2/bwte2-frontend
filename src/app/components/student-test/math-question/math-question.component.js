import {Component} from "../../../shared/model/component/component.js";
import {domService} from "../../../shared/services/dom.service.js";


const component = {
    selector: 'app-math-question',
    templatePath: 'student-test/math-question/math-question.component.html',
    stylePaths: ['student-test/math-question/math-question.component.css'],
};

export class MathQuestionComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
    }

    onInit() {
        this.attributesInitializer();
        this.eventsInitializer();
    }

    attributesInitializer(){
        const question = domService.getAttribute(this, "questionInfo");

        this.loadQuestionWording(question);
        this.loadQuestionBody(question);
    }

    eventsInitializer(){

    }

    loadQuestionWording(question){
        const questionWordingElement = this.dom.getElementById("question-wording-element");
        const questionWording = {
            text: question.questionText,
            points: question.points
        }
        domService.setAttribute(questionWordingElement, "questionWording", questionWording);
    }

    loadQuestionBody(question){
        //TODO: dorobit zobrazenie otazky (okrem samotneho textu otazky/zadania jej bodov)
    }


}
