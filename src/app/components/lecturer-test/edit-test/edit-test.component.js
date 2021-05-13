import {Component} from "../../../shared/model/component/component.js";
import {domService} from "../../../shared/services/dom.service.js";
import {testsService} from "../../../api/tests/services/tests.service.js";

const component = {
    selector: 'app-edit-test',
    templatePath: 'lecturer-test/edit-test/edit-test.component.html',
    stylePaths: ['lecturer-test/edit-test/edit-test.component.css'],
};

export class EditTestComponent extends Component {
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
        const studentTestId = domService.getAttribute(this, "studentTestId");
        testsService.readStudentTestAnswers(studentTestId.studentId, studentTestId.testCode).then(this.setTest);

    }

    eventsInitializer() {
    }

    setTest = (student) => {
        console.log(student);
    };
}

