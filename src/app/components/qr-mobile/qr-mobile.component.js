import {Component} from "../../shared/model/component/component.js";
import {domService} from "../../shared/services/dom.service.js";

const component = {
    selector: 'app-qr-mobile',
    templatePath: 'qr-mobile/qr-mobile.component.html',
    stylePaths: ['qr-mobile/qr-mobile.component.css'],
};

export class QrMobileComponent extends Component {
    static selector = component.selector;

    constructor() {
        super(component);
        this.load().then(() => this.onInit());
        this.animation = null;
    }

    onInit() {
        this.attributesInitializer();
        this.eventsInitializer();
    }

    attributesInitializer() {
        console.log( this.getTestKey() );
        console.log( this.getStudentId() );
        console.log( this.getQuestionId() );
        console.log( this.getToken() );

        this.dom.getElementById("codeTest").value = this.getTestKey();
        this.dom.getElementById("studentId").value = this.getStudentId();
        this.dom.getElementById("questionId").value = this.getQuestionId();
        this.dom.getElementById("token").value = this.getToken();

    }

    eventsInitializer() {
    }


    getTestKey() {

        let queryParams = window.location.search;
        let params = new URLSearchParams(queryParams);

        return params.get("codeTest");
    }
    getStudentId() {
        let queryParams = window.location.search;
        let params = new URLSearchParams(queryParams);

        return params.get("studentId");
    }
    getQuestionId() {
        let queryParams = window.location.search;
        let params = new URLSearchParams(queryParams);

        return params.get("questionId");
    }
    getToken() {
        let queryParams = window.location.search;
        let params = new URLSearchParams(queryParams);

        return params.get("token");
    }

}
