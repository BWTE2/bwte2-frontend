import {Component} from "../../../shared/model/component/component.js";
import {tableService} from "../../../shared/services/table.service.js";
import {testsService} from "../../../api/tests/services/tests.service.js";
import {domService} from "../../../shared/services/dom.service.js";
import {serverSentEventsService} from "../../../api/server-sent-events/services/server-sent-events.service.js";


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
        //this.setStudents();
        this.eventsInitializer();
        this.attributesInitializer();
    }

    attributesInitializer() {
        const testInfo = domService.getAttribute(this, 'test');
        this.dom.getElementById("test-title").innerText = testInfo.title;
        this.dom.getElementById("test-code").innerText = "#" + testInfo.code
        this.activitySource = serverSentEventsService.readTestActivities(testInfo.code);
        document.addEventListener("changeActivities", this.loadStudents);
    }

    eventsInitializer() {
    }

    loadStudents = (response) =>{
        const allStudents = response.detail.students;
        const tableBody = this.dom.getElementById("test-table-body");
        tableBody.innerHTML = "";

        if (allStudents.length > 0) {
            allStudents.forEach(this.createRow);
        } else {
            const placeHolder = tableService.getEmptyTablePlaceholder("Nikto nepíše test");
            tableBody.appendChild(placeHolder);
        }
    }


    createRow = (student) => {
        const name = tableService.getColumn(student.name + ' ' + student.surname);
        const id = tableService.getColumn(student.id);
        const statusText = this.getStatusText(student);
        const status = tableService.getColumn(statusText);
        const row = tableService.getRow([name, id, status]);
        const tableBody = this.dom.getElementById("test-table-body");
        tableBody.appendChild(row);

    };

    getStatusText(student){
        const action = student.action;
        if(action === "FINISHED"){
            return "odovzdal";
        }
        else if(action === "WRITING"){
            return "píše"
        }
        else if(action === "OUT_OF_TAB"){
            return "mimo test"
        }
    }
}
