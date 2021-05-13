import {Component} from "../../../shared/model/component/component.js";


const component = {
    selector: 'app-pair-question',
    templatePath: 'student-test/pair-question/pair-question.component.html',
    stylePaths: ['student-test/pair-question/pair-question.component.css'],
};

export class PairQuestionComponent extends Component {
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
