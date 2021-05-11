import {Component} from "../../../shared/model/component/component.js";
import {testsService} from "../../../api/tests/services/tests.service.js";
import {tableService} from "../../../shared/services/table.service.js";
import {domService} from "../../../shared/services/dom.service.js";

const component = {
    selector: 'app-non-active-test-detail',
    templatePath: 'lecturer-test/non-active-test-detail/non-active-test-detail.component.html',
    stylePaths: ['lecturer-test/non-active-test-detail/non-active-test-detail.component.css'
        , 'lecturer-test/test-table/test-table.component.css'],
};

export class NonActiveTestDetailComponent extends Component {
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
        if (students) {
            students.forEach(this.createRow);
        } else {
            const body = this.dom.getElementById("test-table-body");
            const placeHolder = tableService.getEmptyTablePlaceholder("Nikto nepisal test");
            body.appendChild(placeHolder);
        }
    };

    createRow = (student) => {
        const name = tableService.getColumn(student.name + ' ' + student.surname);
        const id = tableService.getColumn(student.id);
        const action = tableService.getIconButton('editTest', 'fa-arrow-circle-right');
        action.addEventListener("click", this.editStudentTest);
        const row = tableService.getRow([name, id, action]);
        this.table.appendChild(row);
    };

    editStudentTest = () => {
        //TODO:JA TO DOROBIM KED VSTANEM
    };

}
