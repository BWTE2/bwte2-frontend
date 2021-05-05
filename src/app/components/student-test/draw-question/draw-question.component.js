import {Component} from "../../../shared/model/component/component.js";


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

    attributesInitializer() {

    }

    eventsInitializer() {

    }
}
