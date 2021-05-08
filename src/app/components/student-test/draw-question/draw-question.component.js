import {Component} from "../../../shared/model/component/component.js";
import {domService} from "../../../shared/services/dom.service.js";


const component = {
    selector: 'app-draw-question',
    templatePath: 'draw-question/draw-question.component.html',
    stylePaths: ['draw-question/draw-question.component.css'],
};

export class DrawQuestionComponent extends Component {
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
    }

    loadQuestionWording(question){
        const questionWordingElement = this.dom.getElementById("question-wording-element");
        const questionWording = {
            text: question.questionText,
            points: question.points
        }
        domService.setAttribute(questionWordingElement, "questionWording", questionWording);
    }
    eventsInitializer() {

    }


}
