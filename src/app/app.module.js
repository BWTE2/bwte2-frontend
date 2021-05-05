import {HomeComponent} from "./components/home/home.component.js";
import {ApiTestComponent} from "./components/verification/api-test/api-test.component.js";
import {StudentLoginFormComponent} from "./components/home/student-login-form/student-login-form.component.js";
import {LecturerLoginFormComponent} from "./components/home/lecturer-login-form/lecturer-login-form.component.js";
import {LecturerRegisterFormComponent} from "./components/home/lecturer-register-form/lecturer-register-form.component.js";
import {LecturerTestComponent} from "./components/lecturer-test/lecturer-test.component.js";
import {StudentTestComponent} from "./components/student-test/student-test.component.js";
import {SideMenuComponent} from "./components/side-menu/side-menu.component.js";
import {QuestionWordingComponent} from "./components/student-test/question-wording/question-wording.component.js";
import {TestTableComponent} from "./components/lecturer-test/test-table/test-table.component.js";
import {TestMakerComponent} from "./components/lecturer-test/test-maker/test-maker.component.js";
import {MathQuestionComponent} from "./components/student-test/math-question/math-question.component.js";
import {DrawQuestionComponent} from "./components/student-test/draw-question/draw-question.component.js";
import {PairQuestionComponent} from "./components/student-test/pair-question/pair-question.component.js";
import {MultipleAnswerQuestionComponent} from "./components/student-test/multiple-answer-question/multiple-answer-question.component.js";
import {OneAnswerQuestionComponent} from "./components/student-test/one-answer-question/one-answer-question.component.js";


export class AppModule {
    components = [
        HomeComponent,
        LecturerTestComponent,
        StudentTestComponent,
        ApiTestComponent,
        StudentLoginFormComponent,
        LecturerLoginFormComponent,
        LecturerRegisterFormComponent,
        SideMenuComponent,
        QuestionWordingComponent,
        TestTableComponent,
        TestMakerComponent,
        MathQuestionComponent,
        DrawQuestionComponent,
        PairQuestionComponent,
        MultipleAnswerQuestionComponent,
        OneAnswerQuestionComponent
    ]

    constructor() {
        window.onload = () => this.onLoad(this.components);
    }

    onLoad(components) {
        components.forEach((component) => this.createComponents(component));
    };

    createComponents(component) {
        {
            // console.log("<" + component.selector + "></" + component.selector + ">");
            customElements.define(component.selector, component);
        }
    }
}

new AppModule();

