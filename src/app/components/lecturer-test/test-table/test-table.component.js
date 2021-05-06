import {Component} from "../../../shared/model/component/component.js";
import {testsService} from "../../../api/tests/services/tests.service.js";


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
        this.setAllTests();
    }

    setAllTests(){
        testsService.readTests()
            .then(this.writeAllTestsToTable)
    }

    writeAllTestsToTable = (json) =>{
        for(let test of json.response.tests){
            this.writeTestToTable(test);
        }
    }

    writeTestToTable(test){
        const row = this.getTestRow(test);
        this.dom.getElementById("test-table-body").appendChild(row);
    }

    getTestRow(test){
        const row = document.createElement("TR");
        const titleColumn = this.getColumn(test.title);
        const keyColumn = this.getColumn(test.code);
        const activityColumn = this.getActivityColumn(test.is_active);
        const dateColumn = this.getColumn(test.test_created);

        row.appendChild(titleColumn);
        row.appendChild(keyColumn);
        row.appendChild(dateColumn);
        row.appendChild(activityColumn);

        return row;
    }

    getColumn(text){
        const column = document.createElement("TD");
        column.innerText = text;
        return column;
    }

    getActivityColumn(activity){
        if(activity === 1){
            return this.getColumn("Aktívny");
        }
        else{
            return this.getColumn("Neaktívny");
        }
    }

}
