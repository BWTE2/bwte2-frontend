import {Component} from "../../../../shared/model/component/component.js";

const component = {
    selector: 'app-draw-question-view',
    templatePath: 'lecturer-test/edit-test/draw-question-view/draw-question-view.component.html',
    stylePaths: ['lecturer-test/edit-test/draw-question-view/draw-question-view.component.css'],
};

export class DrawQuestionViewComponent extends Component {
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
