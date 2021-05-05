import {Component} from "../../../shared/model/component/component.js";


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

    attributesInitializer() {

    }

    eventsInitializer() {

    }
}