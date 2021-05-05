import {Component} from "../../../shared/model/component/component.js";


const component = {
    selector: 'app-test-table',
    templatePath: 'lecturer-test/test-table/test-table.component.html',
    stylePaths: ['lecturer-test/test-table/test-table.component.css'],
};

export class TestTableComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
    }

    onInit() {
    }

}
