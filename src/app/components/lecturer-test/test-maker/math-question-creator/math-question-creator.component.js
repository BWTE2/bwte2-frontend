import {Component} from "../../../../shared/model/component/component.js";
import {MQ} from "../../../../app.module.js";


const component = {
    selector: 'app-math-question-creator',
    templatePath: 'lecturer-test/test-maker/math-question-creator/math-question-creator.component.html',
    stylePaths: ['lecturer-test/test-maker/math-question-creator/math-question-creator.component.css',
        '../../app/shared/library/mathquill/mathquill.css'],
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
        let problemSpan = this.dom.getElementById('problem');
        MQ.StaticMath(problemSpan);
    }

    eventsInitializer() {

    }

    getInfo() {
        //TODO: tu sa vracaju vsetky info o otazke ktoru vytvoril ucitel
        return {};
    }
}
