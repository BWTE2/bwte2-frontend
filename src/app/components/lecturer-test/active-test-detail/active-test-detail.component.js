import {Component} from "../../../shared/model/component/component.js";
import {tableService} from "../../../shared/services/table.service.js";
import {testsService} from "../../../api/tests/services/tests.service.js";


const component = {
    selector: 'app-active-test-detail',
    templatePath: 'lecturer-test/active-test-detail/active-test-detail.component.html',
    stylePaths: ['lecturer-test/active-test-detail/active-test-detail.component.css',
        'lecturer-test/test-table/test-table.component.css'],
};

export class ActiveTestDetailComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
    }

    onInit() {
        this.table = this.dom.getElementById("test-table-body");
        this.setStudents();
        this.attributesInitializer();
        this.eventsInitializer();
    }

    attributesInitializer() {

    }

    eventsInitializer() {
    }

    setStudents() {
        const testCode = this.getAttribute("testCode");
        testsService.readTestAnswers(testCode).then(this.appendStudents);
    }

    appendStudents = (students) => {
        students.forEach(this.createRow);
    };

    createRow = (student) => {
        //TODO: Uprav premenne prosimta nevim ci som trafi lnazvy
        const name = tableService.getColumn(student.name + ' ' + student.surname);
        const id = tableService.getColumn(student.id);
        // const status = tableService.getColumn(student.status);
        const row = tableService.getRow([name, id, 'placeHolder']);
        this.table.appendChild(row);
    };
}
