import {Component} from "../../../../shared/model/component/component.js";
import {domService} from "../../../../shared/services/dom.service.js";


const component = {
    selector: 'app-multichoice-option',
    templatePath: 'student-test/multiple-answer-question/multichoice-option/multichoice-option.component.html',
    stylePaths: ['student-test/multiple-answer-question/multichoice-option/multichoice-option.component.css'],
};

export class MultichoiceOptionComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
    }

    onInit() {
        this.attributesInitializer();
        this.eventsInitializer();
    }

    attributesInitializer(){
    }

    eventsInitializer(){

    }


}
