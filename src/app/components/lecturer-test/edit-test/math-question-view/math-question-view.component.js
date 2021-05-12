import {Component} from "../../../../shared/model/component/component.js";


const component = {
    selector: 'app-math-question-view',
    templatePath: 'lecturer-test/edit-test/math-question-view/math-question-view.component.html',
    stylePaths: ['lecturer-test/edit-test/math-question-view/math-question-view.component.css'],
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

    }

    eventsInitializer() {
    }
}
