import {Component} from "../../shared/model/component/component.js";
import {domService} from "../../shared/services/dom.service.js";
import {testsService} from "../../api/tests/services/tests.service.js";


const component = {
    selector: 'app-student-test',
    templatePath: 'student-test/student-test.component.html',
    stylePaths: ['student-test/student-test.component.css'],
};

export class StudentTestComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
    }

    onInit() {
        this.attributesInitializer();
        this.eventsInitializer();
        this.loadTest();
    }


    attributesInitializer() {
        this.setName();
    }

    eventsInitializer() {
        const sideMenu = this.dom.getElementById("side-menu");
        sideMenu.addEventListener("sendTest", (e) => {
            console.log(e.detail);
        });

        const questionsButton = this.dom.getElementById("questions-button");
        questionsButton.addEventListener("click", this.loadTest);
    }

    setName() {
        const actualName = "Lubos Sremanak";
        const sideMenu = this.dom.getElementById("side-menu");
        domService.setAttribute(sideMenu, "headerName", actualName);
    }

    loadTest = () =>{
        const testKey = this.getTestKey();
        testsService.readQuestions(testKey)
            .then(this.showQuestions);
    }

    getTestKey(){
        //TODO: tento kod treba prerobit ked sa vytvori prihlasovanie k testu
        const keyInput = this.dom.getElementById("key-input");
        return keyInput.value;
    }

    showQuestions = () =>{
        
    }

}
