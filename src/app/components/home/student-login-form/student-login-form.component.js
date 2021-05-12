import {Component} from "../../../shared/model/component/component.js";
import {snackbarService} from "../../../shared/services/snackbar.service.js";
import {studentService} from "../../../api/student/services/student.service.js";

const component = {
    selector: 'app-student-login-form',
    templatePath: 'home/student-login-form/student-login-form.component.html',
    stylePaths: ['home/lecturer-login-form/lecturer-login-form.component.css'],
};

export class StudentLoginFormComponent extends Component {
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

    eventsInitializer()
    {
        let loginButton = this.dom.getElementById("student-login-button");

        loginButton.addEventListener("click", () => {
            this.validateAndLoginStudent();
        });

    }

    validateAndLoginStudent()
    {
        if(this.isFilledInput())
        {
            this.loginStudent();
        }

    }

    loginStudent()
    {
        studentService.createLecturerLogin(this.createLoginData()).then(this.verifyTestDataAndStartTest).then(this.a);

    }

    a = (d) => {

        console.log(d);
    }

    createLoginData()
    {
        let codeTest = this.getCodeTest().trim();
        let studentId = this.getStudentId().trim();
        let studentName = this.getStudnetName().trim();
        let studentSurname = this.getStudentSurname().trim();

        return {
            codeTest: codeTest,
            studentId: studentId,
            studentName: studentName,
            studentSurname: studentSurname
        }
    }

    verifyTestDataAndStartTest = (json) => {
        let data = json.response;
        console.log(data);

        console.log(json);

        let isAbleTestToWrite = this.isAbleTestToWrite(data);

        if(isAbleTestToWrite)
        {
            location.replace(this.getTestUrl(data.codeTest, data.student.studentId));
        }

    }


    getTestUrl(codeTest,studentId)
    {
        let baseUrl = "app/views/student-test/index.html";

        let params = "?codeTest=" + codeTest + "&studentId=" + studentId;

        return baseUrl + params;
    }



    isAbleTestToWrite(testResponse)
    {
        if(testResponse.isExistsTest === false)
        {
            this.showDangerMessage("Test s týmto kódom neexistuje",3);
            return false;
        }

        if(testResponse.isActivateTest === false)
        {
            this.showDangerMessage("Test s týmto kódom nebol povolený", 3);
            return false;
        }

        if(testResponse.isWroteTest === true)
        {
            this.showWarningMessage("Test s týmto kódom si už odovzdal/a", 3);
            return false;
        }

        return true;

    }


    isFilledInput()
    {
        if(this.isFilledCodeTest() && this.isFilledIdStudent() && this.isFilledNameStudent() && this.isFilledSurname())
        {
            return true;
        }

        // snackbarService.open(this.dom,{type: "danger", message: "Nesprávne údaje", duration: 3});
        this.showDangerMessage("Nesprávne údaje",3);

        return false;

    }

    isFilledCodeTest()
    {
        let codeTest = this.getCodeTest();

        return !(codeTest === "" || codeTest === null);
    }

    isFilledIdStudent()
    {
        let studentId = this.getStudentId();

        return !(studentId === "" || studentId === null);
    }

    isFilledNameStudent()
    {
        let studentName = this.getStudnetName();

        return !(studentName === "" || studentName === null);
    }

    isFilledSurname()
    {
        let studentSurname = this.getStudentSurname();

        return !(studentSurname === "" || studentSurname === null);
    }


    getCodeTest()
    {
        return this.dom.getElementById("code-test").value;
    }

    getStudentId()
    {
        return this.dom.getElementById("id-student").value;
    }

    getStudnetName()
    {
        return this.dom.getElementById("name-student").value;
    }

    getStudentSurname()
    {
        return this.dom.getElementById("surname-student").value;
    }


    showDangerMessage(message, duration)
    {
        snackbarService.open(this.dom,{type: "danger", message: message, duration: duration});
    }

    showWarningMessage(message, duration)
    {
        snackbarService.open(this.dom,{type: "warning", message: message, duration: duration});
    }

    showSuccessMessage(message, duration)
    {
        snackbarService.open(this.dom,{type: "success", message: message, duration: duration});
    }
}
