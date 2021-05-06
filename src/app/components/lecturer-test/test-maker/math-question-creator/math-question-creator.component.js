import {Component} from "../../../../shared/model/component/component.js";


const component = {
    selector: 'app-math-question-creator',
    templatePath: 'lecturer-test/test-maker/math-question-creator/math-question-creator.component.html',
    stylePaths: ['lecturer-test/test-maker/math-question-creator/math-question-creator.component.css'],
};

export class MathQuestionCreatorComponent extends Component {
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
