import {Component} from "../../../../shared/model/component/component.js";


const component = {
    selector: 'app-multiple-answer-question-creator',
    templatePath: 'lecturer-test/test-maker/multiple-answer-question-creator/multiple-answer-question-creator.component.html',
    stylePaths: ['lecturer-test/test-maker/multiple-answer-question-creator/multiple-answer-question-creator.component.css'],
};

export class MultipleAnswerQuestionCreatorComponent extends Component {
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

    getInfo(){
        //TODO: tu sa vracaju vsetky info o otazke ktoru vytvoril ucitel
        return {};
    }
}
