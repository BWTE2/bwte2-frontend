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
        if(this.isFilledInput() && this.isCorrectInput())
        {
            this.loginStudent();
        }

    }

    loginStudent()
    {
        studentService.createLecturerLogin(this.createLoginData()).then(this.verifyTestDataAndStartTest);

    }



    createLoginData()
    {
        let codeTest = this.getCodeTest();
        let studentId = this.getStudentId();
        let studentName = this.getStudentName();
        let studentSurname = this.getStudentSurname();

        return {
            codeTest: codeTest,
            studentId: studentId,
            studentName: studentName,
            studentSurname: studentSurname
        }
    }

    verifyTestDataAndStartTest = (json) => {
        let data = json.response;


        let isAbleTestToWrite = this.isAbleTestToWrite(data);

        if(isAbleTestToWrite)
        {
            location.replace(this.getTestUrl(data.codeTest, data.student.studentId));
        }

    }


    getTestUrl(codeTest,studentId)
    {
        let baseUrl = "app/views/student-test/index.html";

        let params = "?codeTest=" + codeTest;

        return baseUrl + params;
    }



    isAbleTestToWrite(testResponse)
    {
        if(testResponse.isExistsTest === false)
        {
            this.showDangerMessage("Test s t??mto k??dom neexistuje",3);
            return false;
        }

        if(testResponse.isActivateTest === false)
        {
            this.showDangerMessage("Test s t??mto k??dom nebol povolen??", 3);
            return false;
        }

        if(testResponse.isWroteTest === true)
        {
            this.showWarningMessage("Test s t??mto k??dom si u?? odovzdal/a", 3);
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

        // snackbarService.open(this.dom,{type: "danger", message: "Nespr??vne ??daje", duration: 3});
        this.showDangerMessage("Nespr??vne ??daje",3);

        return false;

    }

    isCorrectInput()
    {
        if(this.getCodeTest().length < 6 || this.getCodeTest().length > 6)
        {
            this.showWarningMessage("K??d testu mus?? obsahova?? 6 znakov",3);
            return false;
        }

        if(this.getStudentId().length > 10)
        {
            this.showWarningMessage("ID ??tudenta m????e obsahova?? maxim??lne 10 znakov",3);
            return false;
        }

        if(this.getStudentName().length > 128)
        {
            this.showWarningMessage("Meno ??tudenta presahuje maxim??lny po??et znakov", 3);
            return false;
        }

        if(this.getStudentSurname().length > 128)
        {
            this.showWarningMessage("Priezvisko ??tudenta presahuje maxim??lny po??et znakov",3);
            return false;
        }

        return true;
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
        let studentName = this.getStudentName();

        return !(studentName === "" || studentName === null);
    }

    isFilledSurname()
    {
        let studentSurname = this.getStudentSurname();

        return !(studentSurname === "" || studentSurname === null);
    }


    getCodeTest()
    {
        return this.dom.getElementById("code-test").value.trim();
    }

    getStudentId()
    {
        return this.dom.getElementById("id-student").value.trim();
    }

    getStudentName()
    {
        return this.dom.getElementById("name-student").value.trim();
    }

    getStudentSurname()
    {
        return this.dom.getElementById("surname-student").value.trim();
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
