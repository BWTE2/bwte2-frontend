import {Component} from "../../shared/model/component/component.js";
import {StudentLoginFormComponent} from "./student-login-form/student-login-form.component.js";
import {LecturerLoginFormComponent} from "./lecturer-login-form/lecturer-login-form.component.js";
import {domService} from "../../shared/services/dom.service.js";
import {lecturerService} from "../../api/lecturer/services/lecturer.service.js";


const component = {
    selector: 'app-home',
    templatePath: 'home/home.component.html',
    stylePaths: ['home/home.component.css'],
};

export class HomeComponent extends Component {
    static selector = component.selector;


    constructor() {
        super(component);
        this.checkLoggedLecturer().then(() => {
            this.load().then(() => this.onInit());
        })

    }

    async checkLoggedLecturer()
    {
        this.preResponse = await lecturerService.getLecturerInfo();
        console.log(this.preResponse.response);

        let lecturerInfo = this.preResponse.response;

        if(lecturerInfo.isLogged)
        {
            this.redirectToLecturerTest(lecturerInfo.info);
        }
    }

    onInit() {
        this.eventsInitializer();
        this.attributesInitializer();
    }

    attributesInitializer() {

    }

    eventsInitializer() {
        const form = this.dom.getElementById("dynamic-form");
        domService.changeDom(form, LecturerLoginFormComponent);
        const studentLoginButton = this.dom.getElementById("student-button");
        studentLoginButton.addEventListener("click", () => this.studentLoginButtonClick(this.dom));
        const lecturerLoginButton = this.dom.getElementById("lecturer-button");
        lecturerLoginButton.addEventListener("click", () => this.lecturerLoginButtonClick(this.dom));
    }

    studentLoginButtonClick(dom) {
        const form = dom.getElementById("dynamic-form");
        domService.changeDom(form, StudentLoginFormComponent);
        form.scrollIntoView();
    }

    lecturerLoginButtonClick(dom) {
        const form = dom.getElementById("dynamic-form");
        domService.changeDom(form, LecturerLoginFormComponent);
        form.scrollIntoView();
    }


    redirectToLecturerTest(lecturer)
    {
        location.replace(this.getLecturerUrl(lecturer.id));
    }

    getLecturerUrl(lerturerId)
    {
        let baseUrl = "app/views/lecturer-test/index.html";

        // let params = "?lecturerId=" + lerturerId;
        //
        // return baseUrl + params;

        return baseUrl;
    }

    checkIsComponentRendered() {
        // TODO: Skontroluj či už nahodou dany komponent nieje otvorený,
        //  napirklad: je otvoreny Student login kliknem na Som student tak ho nebude znovu renderovat
        //  "rendererService.changeDom(form, StudentLoginFormComponent);"
    }
}
