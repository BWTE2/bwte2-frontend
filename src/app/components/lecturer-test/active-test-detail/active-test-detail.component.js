import {Component} from "../../../shared/model/component/component.js";
import {tableService} from "../../../shared/services/table.service.js";
import {testsService} from "../../../api/tests/services/tests.service.js";
import {domService} from "../../../shared/services/dom.service.js";


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
        const testInfo = domService.getAttribute(this, 'test');
        this.dom.getElementById("test-title").innerText = testInfo.title;
        this.dom.getElementById("test-code").innerText = "#" + testInfo.code
        testsService.readTestAnswers(testInfo.code).then(this.appendStudents);
    }

    appendStudents = (json) => {
        const students = json.response.students;
        if (students && students.length !== 0) {
            students.forEach(this.createRow);
        } else {
            const body = this.dom.getElementById("test-table-body");
            const placeHolder = tableService.getEmptyTablePlaceholder("Nikto nepíše test");
            body.appendChild(placeHolder);
        }
    };

    createRow = (student) => {
        const name = tableService.getColumn(student.name + ' ' + student.surname);
        const id = tableService.getColumn(student.id);
        // const status = tableService.getColumn(student.status);
        const row = tableService.getRow([name, id, 'placeHolder']);
        this.table.appendChild(row);
    };
}
