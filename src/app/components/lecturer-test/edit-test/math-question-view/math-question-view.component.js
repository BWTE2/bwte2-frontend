import {Component} from "../../../../shared/model/component/component.js";
import {domService} from "../../../../shared/services/dom.service.js";


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
        const test = domService.getAttribute(this, "test");
        this.questionId = test.question.id;
    }

    eventsInitializer() {
    }

    getInfo(){
        return {points: 0, questionId: this.questionId};
    }
}
