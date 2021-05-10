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
        this.questionsContainer = this.dom.getElementById("question-creator-container");
        this.attributesInitializer();
        this.eventsInitializer();
    }

    attributesInitializer() {


    }

    eventsInitializer() {
        this.initButtons();
        document.addEventListener("sendTest", this.sendTest);
    }

    initButtons() {
        const addMultiChoiceButton = this.dom.getElementById("add-multichoice-button");
        addMultiChoiceButton.addEventListener("click", this.createMultiChoiceQuestion);
        const addOpenAnswerQuestionButton = this.dom.getElementById("add-open-answer-button");
        addOpenAnswerQuestionButton.addEventListener("click", this.createOpenAnswerQuestion);
        const addPairQuestionButton = this.dom.getElementById("add-pair-question-button");
        addPairQuestionButton.addEventListener("click", this.createPairQuestion);
        const addDrawQuestionButton = this.dom.getElementById("add-draw-question-button");
        addDrawQuestionButton.addEventListener("click", this.createDrawQuestion);
        const addMathQuestionButton = this.dom.getElementById("add-math-question-button");
        addMathQuestionButton.addEventListener("click", this.createMathQuestion);
    }

    createMultiChoiceQuestion = () => {
        const question = document.createElement("APP-MULTIPLE-ANSWER-QUESTION-CREATOR");
        this.appendQuestionAndScroll(question);
    }

    createOpenAnswerQuestion = () => {
        const question = document.createElement("APP-ONE-ANSWER-QUESTION-CREATOR");
        this.appendQuestionAndScroll(question);
    };

    createPairQuestion = () => {
        const question = document.createElement("APP-PAIR-QUESTION-CREATOR");
        this.appendQuestionAndScroll(question);
    };

    createDrawQuestion = () => {
        const question = document.createElement("APP-DRAW-QUESTION-CREATOR");
        this.appendQuestionAndScroll(question);
    };

    createMathQuestion = () => {
        const question = document.createElement("APP-MATH-QUESTION-CREATOR");
        this.appendQuestionAndScroll(question);
    };

    appendQuestionAndScroll(question) {
        this.questionsContainer.appendChild(question);
        question.scrollIntoView();
    }

    sendTest = () => {
        keyGeneratorService.readGeneratedKey()
            .then(this.sendTestWithKey)
    }

    sendTestWithKey = (json) => {
        const testName = this.dom.getElementById("test-name").value;
        const timeLimit = this.dom.getElementById("time-limit").value;
        const questions = this.getAllQuestions();
        const key = json.response.key;

        const test = {
            name: testName,
            timeLimit: timeLimit,
            questions: questions
        }

        testsService.createTest(key, test)
            .then(() => location.reload());
    }

    getAllQuestions() {
        const allQuestions = [];
        const allCreators = this.questionsContainer.getElementsByTagName("*");
        for (let question of allCreators) {
            const questionInfo = this.getQuestionInfo(question);
            allQuestions.push(questionInfo);
        }

        return allQuestions;
    }

    getQuestionInfo(question) {
        let questionInfo;

        if (question.tagName === 'APP-MULTIPLE-ANSWER-QUESTION-CREATOR') {
            questionInfo = this.getMultiChoiceQuestionInfo(question);
        } else if (question.tagName === 'APP-MATH-QUESTION-CREATOR') {
            questionInfo = this.getMathQuestionInfo(question);
        } else if (question.tagName === 'APP-ONE-ANSWER-QUESTION-CREATOR') {
            questionInfo = this.getOneAnswerQuestionInfo(question);
        } else if (question.tagName === 'APP-PAIR-QUESTION-CREATOR') {
            questionInfo = this.getPairQuestionInfo(question);
        } else if (question.tagName === 'APP-DRAW-QUESTION-CREATOR') {
            questionInfo = this.getDrawQuestionInfo(question);
        }
        return questionInfo;
    }

    getMultiChoiceQuestionInfo(question) {
        const data = question.getInfo();
        return {type: "multiChoice", data: data};
    }

    getMathQuestionInfo(question) {
        const data = question.getInfo();
        return {type: "math", data: data};
    }

    getOneAnswerQuestionInfo(question) {
        const data = question.getInfo();
        return {type: "oneAnswerQuestion", data: data};
    }

    getPairQuestionInfo(question) {
        const data = question.getInfo();
        return {type: "pairQuestion", data: data};
    }

    getDrawQuestionInfo(question) {
        const data = question.getInfo();
        return {type: "draw", data: data};
    }

}
