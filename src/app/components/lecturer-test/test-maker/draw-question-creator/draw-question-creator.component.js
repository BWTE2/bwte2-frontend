import {Component} from "../../../../shared/model/component/component.js";


const component = {
    selector: 'app-draw-question-creator',
    templatePath: 'lecturer-test/test-maker/draw-question-creator/draw-question-creator.component.html',
    stylePaths: ['lecturer-test/test-maker/draw-question-creator/draw-question-creator.component.css'],
};

export class DrawQuestionCreatorComponent extends Component {
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
