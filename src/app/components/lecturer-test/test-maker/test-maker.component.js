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
        this.initButtons();
        document.addEventListener("sendTest", this.sendTest);
    }

    initButtons(){
        const addMultiChoiceButton = this.dom.getElementById("add-multichoice-button");
        addMultiChoiceButton.addEventListener("click", this.creatMultiChoiceQuestion);
    }

    creatMultiChoiceQuestion = () =>{
        const multiChoiceQuestion = document.createElement("APP-MULTIPLE-ANSWER-QUESTION-CREATOR");
        const questionsContainer = this.dom.getElementById("question-wording-properties");
        questionsContainer.appendChild(multiChoiceQuestion);
    }

    sendTest = () =>{
        keyGeneratorService.readGeneratedKey()
            .then(this.sendTestWithKey)
    }

    sendTestWithKey = (json) =>{
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

    getAllQuestions(){
        const allQuestions = [];
        const questionCreatorsContainer = this.dom.getElementById("question-wording-properties");

        for(let question of questionCreatorsContainer.getElementsByTagName("*") )
        {
            const questionInfo = this.getQuestionInfo(question);
            allQuestions.push(questionInfo);
        }

        return allQuestions;
    }

    getQuestionInfo(question){
        let questionInfo;

        if(question.tagName === 'APP-MULTIPLE-ANSWER-QUESTION-CREATOR'){
            questionInfo = this.getMultiChoiceQuestionInfo(question);
        }
        else if(question.tagName === 'APP-MATH-QUESTION-CREATOR'){
            questionInfo = this.getMathQuestionInfo(question);
        }
        else if(question.tagName === 'APP-ONE-ANSWER-QUESTION-CREATOR'){
            questionInfo = this.getOneAnswerQuestionInfo(question);
        }
        else if(question.tagName === 'APP-PAIR-QUESTION-CREATOR'){
            questionInfo = this.getPairQuestionInfo(question);
        }

        return  questionInfo;
    }

    getMultiChoiceQuestionInfo(question){
        const data = question.getInfo();
        return {type: "multiChoice", data: data};
    }

    getMathQuestionInfo(question){
        const data = question.getInfo();
        return {type: "math", data: data};
    }

    getOneAnswerQuestionInfo(question){
        const data = question.getInfo();
        return {type: "oneAnswer", data: data};
    }

    getPairQuestionInfo(question){
        const data = question.getInfo();
        return {type: "oneAnswer", data: data};
    }

}
