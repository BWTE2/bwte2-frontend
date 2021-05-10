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
        document.addEventListener("sendTest", this.sendTest);
        const sideMenu = this.dom.getElementById("side-menu");
        sideMenu.addEventListener("menuSwap", this.menuSwapped);
        const questionsButton = this.dom.getElementById("questions-button");
        questionsButton.addEventListener("click", this.loadTest);
    }

    sendTest = () => {
        const testKey = this.getTestKey();
        const studentId = this.getStudentId();
        const allAnswers = this.getAllAnswers();
        console.log(allAnswers)
        testsService.createStudentTestAnswers(studentId, testKey, allAnswers)
            .then((json) => console.log(json));
    };

    getStudentId() {
        //TODO: prerobit podla potreby, zatial v development faze
        return "1";
    }

    getAllAnswers(){
        const allAnswers = [];
        const paper = this.dom.getElementById("paper");

        for(let answerElement of paper.getElementsByTagName("*")){
            const answer = this.getAnswer(answerElement);
            allAnswers.push(answer);
        }

        return {
            answers: allAnswers
        };
    }

    getAnswer(answerElement){
        const questionInfo = domService.getAttribute(answerElement, "questionInfo");
        const questionAnswer = answerElement.getAnswer();
        return {
            questionInfo: questionInfo,
            answer: questionAnswer
        }
    }

    menuSwapped = (e) => {
        const paper = this.dom.getElementById("paper");
        if (e.detail === "400px") {
            paper.style.marginLeft = "0px";
        } else {
            paper.style.marginLeft = "400px";
        }
    }

    setName() {
        const actualName = "Lubos Sremanak";
        const sideMenu = this.dom.getElementById("side-menu");
        domService.setAttribute(sideMenu, "headerName", actualName);
    }

    loadTest = () => {
        const testKey = this.getTestKey();
        testsService.readQuestions(testKey)
            .then(this.showAllQuestions);
    }

    getTestKey() {
        //TODO: tento kod treba prerobit ked sa vytvori prihlasovanie k testu
        const keyInput = this.dom.getElementById("key-input");
        return keyInput.value;
    }

    showAllQuestions = (json) => {
        const test = json.response;
        //TODO: funkcia informAboutTestFetch je len pre development, po dokonceni loginu treba preprogramovat
        this.informAboutTestFetch(test);
        if (!test.exists) {
            return;
        }

        this.dom.getElementById("paper").innerHTML = "";

        let questionCount = 1;
        for (let question of test.questions) {
            question.questionText = questionCount + ". " + question.questionText;
            this.showQuestion(question);
            questionCount++;
        }
    }

    informAboutTestFetch(test) {
        if (!test.exists) {
            this.dom.getElementById("test-info").innerHTML = "TEST NEEXISTUJE";
        } else {
            this.dom.getElementById("test-info").innerHTML = "TEST: " + test.testName;
        }
    }

    showQuestion(question) {
        if (question.type === "CHOICE") {
            this.showMultiChoiceQuestion(question);
        } else if (question.type === "SHORT_ANSWER") {
            this.showOneAnswerQuestion(question);
        } else if (question.type === "PAIR") {
            this.showPairQuestion(question);
        } else if (question.type === "DRAW") {
            this.showDrawQuestion(question);
        } else if (question.type === "MATH") {
            this.showMathQuestion(question)
        }
    }

    showMultiChoiceQuestion(question) {
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-MULTIPLE-ANSWER-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }

    showOneAnswerQuestion(question) {
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-ONE-ANSWER-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }

    showPairQuestion(question) {
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-PAIR-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }

    showDrawQuestion(question) {
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-DRAW-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }

    showMathQuestion(question) {
        const paper = this.dom.getElementById("paper");
        const appQuestion = document.createElement("APP-MATH-QUESTION");
        domService.setAttribute(appQuestion, "questionInfo", question);
        paper.appendChild(appQuestion);
    }
}
