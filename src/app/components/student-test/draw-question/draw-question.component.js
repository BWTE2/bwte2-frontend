import {Component} from "../../../shared/model/component/component.js";
import {domService} from "../../../shared/services/dom.service.js";
import {CanvasComponent} from "./canvas/canvas.component.js";


const component = {
    selector: 'app-draw-question',
    templatePath: 'student-test/draw-question/draw-question.component.html',
    stylePaths: ['student-test/draw-question/draw-question.component.css'],
};

export class DrawQuestionComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
        this.imgUrl = null;
        this.canvas = null;
    }

    onInit() {
        this.attributesInitializer();
        this.eventsInitializer();
    }

    attributesInitializer() {
        const question = domService.getAttribute(this, "questionInfo");
        document.addEventListener("saveCanvasImage", this.setImage);
        this.loadQuestionWording(question);
        this.loadQuestionBody(question);

    }

    eventsInitializer() {
        this.dom.getElementById("draw").addEventListener("click", this.openCanvas);
    }


    loadQuestionWording(question) {
        const questionWordingElement = this.dom.getElementById("question-wording-element");
        this.questionWording = {
            text: question.questionText,
            points: question.points
        }
        domService.setAttribute(questionWordingElement, "questionWording", this.questionWording);
    }

    loadQuestionBody(question) {
        //TODO: dorobit zobrazenie otazky (okrem samotneho textu otazky/zadania jej bodov)
    }

    getAnswer() {
        return this.imgUrl;
    }


    setImage = (event) => {
        this.imgUrl = event.detail;
    };

    openCanvas = () => {
        const attribute = {
            name: "question-wording",
            data: this.questionWording
        };

        console.log(attribute);
        domService.appendDomAndSetAttribute(this.dom, CanvasComponent, attribute);


    };
}
