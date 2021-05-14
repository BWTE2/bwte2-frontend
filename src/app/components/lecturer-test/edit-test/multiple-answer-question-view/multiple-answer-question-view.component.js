import {Component} from "../../../../shared/model/component/component.js";
import {domService} from "../../../../shared/services/dom.service.js";

const component = {
    selector: 'app-multiple-answer-question-view',
    templatePath: 'lecturer-test/edit-test/multiple-answer-question-view/multiple-answer-question-view.component.html',
    stylePaths: ['lecturer-test/edit-test/multiple-answer-question-view/multiple-answer-question-view.component.css',
        'student-test/multiple-answer-question/multiple-answer-question.component.css'],
};

export class MultipleAnswerQuestionViewComponent extends Component {
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
        const test = domService.getAttribute(this, "test");
        this.preloadPoints(test.question.points);
        this.loadQuestionWording(test.question);
        this.loadOptions(test.question.answer.answers);
    }

    eventsInitializer() {
    }

    preloadPoints(points) {
        const pointsEdit = this.dom.getElementById("points-edit");
        domService.setAttribute(pointsEdit, "points", points);
    }

    loadQuestionWording(question) {
        const questionWordingElement = this.dom.getElementById("question-wording-element");
        const questionWording = {
            text: question.text,
            points: question.maxPoints
        }
        domService.setAttribute(questionWordingElement, "questionWording", questionWording);
    }

    loadOptions(answers){
        const optionsContainer = this.dom.getElementById("options-container");
        for(let option of answers.allOptions){
            const container = document.createElement("DIV");
            container.classList.add("one-option-container");
            const checkbox = this.getCheckBox(option, answers.studentOptions);
            const optionElement = this.getOption(option);
            container.appendChild(checkbox);
            container.appendChild(optionElement);
            optionsContainer.appendChild(container);
        }
    }

    getOption(option){
        const optionElement = document.createElement("SPAN");
        optionElement.innerText = option.text;
        return optionElement;
    }

    getCheckBox(option, studentOptions){
        const checkbox = document.createElement("INPUT");

        if (studentOptions.some(e => e.id === option.id)) {
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("checked", true);
            checkbox.setAttribute("disabled", true);
        }
        else{
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("disabled", true);
        }

        return checkbox;
    }

}
