import {Component} from "../../shared/model/component/component.js";
import {domService} from "../../shared/services/dom.service.js";
import {testsService} from "../../api/tests/services/tests.service.js";
import {serverSentEventsService} from "../../api/server-sent-events/services/server-sent-events.service.js";
import {studentService} from "../../api/student/services/student.service.js";


const component = {
    selector: 'app-student-test',
    templatePath: 'student-test/student-test.component.html',
    stylePaths: ['student-test/student-test.component.css'],
};

export class StudentTestComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.wantSendTest = false;
        this.checkUnauthorized().then(() => {
            this.isSetParam();
            this.load().then(() => this.onInit());
        });
    }

    async checkUnauthorized() {
        const testKey = this.getTestKey();
        this.preResponse = await testsService.readQuestions(testKey);

        if (this.preResponse.responseErrorMessage) {
            alert(this.preResponse.responseErrorMessage.responseCode)
            console.log(this.preResponse);
            this.handleErrorResponseMessage(this.preResponse.responseErrorMessage);
        }
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

        window.addEventListener("beforeunload",(e) =>{
            if(!this.wantSendTest){
                e.preventDefault();
                e = e || window.event;
                //IE & Firefox
                if (e) {
                    e.returnValue = 'Pokiaľ odídeš, test sa odošle.';
                }
                // For Safari
                return 'Pokiaľ odídeš, test sa odošle.';
            }
        });

        window.addEventListener("unload", () => {
            if(!this.wantSendTest) {
                this.sendTest()
            }
        });
/*
        window.addEventListener("focus", () => {});
        window.addEventListener("blur", () => {console.log("podvadzam")});*/
    }



    sendTest = () => {
        const testKey = this.getTestKey();
        const studentId = this.getStudentId();
        const allAnswers = this.getAllAnswers();

        testsService.createStudentTestAnswers(studentId, testKey, allAnswers)
            .then(this.unsetUnloadEvents)
            .then(this.redirectToLoginPage);
    };

    unsetUnloadEvents = () =>{
        this.wantSendTest = true;
    }

    redirectToLoginPage = () => {
        location.replace("../../../index.html");
    }

    getStudentId() {
        let queryParams = window.location.search;
        let params = new URLSearchParams(queryParams);

        return params.get("studentId");
    }

    getAllAnswers() {
        const allAnswers = [];
        const paper = this.dom.getElementById("paper");

        for (let answerElement of paper.getElementsByTagName("*")) {
            const answer = this.getAnswer(answerElement);
            allAnswers.push(answer);
        }

        return {
            answers: allAnswers
        };
    }

    getAnswer(answerElement) {
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

    loadTest() {
        this.showAllQuestions(this.preResponse);
    }

    getTestKey() {

        let queryParams = window.location.search;
        let params = new URLSearchParams(queryParams);

        return params.get("codeTest");
    }

    showAllQuestions(test) {
        test = test.response;
        this.dom.getElementById("paper").innerHTML = "";

        if (!test.exists) {
            return;
        } else if (test.exists && !test.activated) {
            return;
        }

        let questionCount = 1;
        for (let question of test.questions) {
            question.questionText = questionCount + ". " + question.questionText;
            this.showQuestion(question);
            questionCount++;
        }

        this.startTimer();
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

    startTimer = () => {
        const testKey = this.getTestKey();
        this.timeSource = serverSentEventsService.readTestTimer(testKey);
    }


    isSetParam() {
        if (this.getTestKey() === null || this.getStudentId() === null) {
            this.redirectToLoginPage();
        }
    }

    handleErrorResponseMessage(errorMessage) {
        if (errorMessage.responseCode === 401) {
            this.redirectToLoginPage();
        }
    }


}
