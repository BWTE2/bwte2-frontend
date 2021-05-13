import {Component} from "../../../../shared/model/component/component.js";


const component = {
    selector: 'app-pair-question-creator',
    templatePath: 'lecturer-test/test-maker/pair-question-creator/pair-question-creator.component.html',
    stylePaths: ['lecturer-test/test-maker/pair-question-creator/pair-question-creator.component.css'],
};

export class PairQuestionCreatorComponent extends Component {
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
