import {Component} from "../../../shared/model/component/component.js";
import {keyGeneratorService} from "../../../api/key-generator/services/key-generator.service.js";
import {testsService} from "../../../api/tests/services/tests.service.js";


const component = {
    selector: 'app-test-maker',
    templatePath: 'lecturer-test/test-maker/test-maker.component.html',
    stylePaths: ['lecturer-test/test-maker/test-maker.component.css'],
};

export class TestMakerComponent extends Component {
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
        document.addEventListener("sendTest", this.sendTest);
    }

    sendTest = () =>{
        keyGeneratorService.readGeneratedKey()
            .then(this.sendTestWithKey)
    }

    sendTestWithKey = (json) =>{
        const testName = this.dom.getElementById("test-name").value;
        const timeLimit = this.dom.getElementById("time-limit").value;
        const key = json.response.key;

        const test = {
            name: testName,
            timeLimit: timeLimit,
            questions: [

            ]
        }

       testsService.createTest(key, test).then((json) => console.log(json));
    }



}
