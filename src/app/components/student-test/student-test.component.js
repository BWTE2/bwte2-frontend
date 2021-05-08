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
            .then(this.showAllQuestions);
    }

    getTestKey(){
        //TODO: tento kod treba prerobit ked sa vytvori prihlasovanie k testu
        const keyInput = this.dom.getElementById("key-input");
        return keyInput.value;
    }

    showAllQuestions = (json) =>{
        const test = json.response;
        //TODO: funkcia informAboutTestFetch je len pre development, po dokonceni loginu treba preprogramovat
        this.informAboutTestFetch(test);
        if(!test.exists){
            return;
        }

        let testCount = 1;
        for(let question of test.questions){
            question.questionText = testCount + ". " + question.questionText;
            this.showQuestion(question);
            testCount++;
        }
    }

    informAboutTestFetch(test){
        if(!test.exists){
            this.dom.getElementById("test-info").innerHTML = "TEST NEEXISTUJE";
        }
        else{
            this.dom.getElementById("test-info").innerHTML = "TEST: " + test.testName;
        }
    }

    showQuestion(question){
        if(question.type === "CHOICE"){
            this.showMultiChoiceQuestion(question);
        }
        else if(question.type === "SHORT_ANSWER"){
            this.showOneAnswerQuestion(question);
        }
        else if(question.type === "PAIR"){
            this.showPairQuestion(question);
        }
        else if(question.type === "DRAW"){
            this.showDrawQuestion(question);
        }
        else if(question.type === "MATH"){
            this.showMathQuestion(question)
        }
    }

    showMultiChoiceQuestion(question){
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-MULTIPLE-ANSWER-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }

    showOneAnswerQuestion(question){
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-MULTIPLE-ANSWER-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }

    showPairQuestion(question){
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-MULTIPLE-ANSWER-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }

    showDrawQuestion(question){
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-MULTIPLE-ANSWER-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }

    showMathQuestion(question){
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-MULTIPLE-ANSWER-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }
}
