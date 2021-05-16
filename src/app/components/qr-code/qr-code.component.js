import {Component} from "../../shared/model/component/component.js";
import {domService} from "../../shared/services/dom.service.js";

const component = {
    selector: 'app-qr-code',
    templatePath: 'qr-code/qr-code.component.html',
    stylePaths: ['qr-code/qr-code.component.css'],
};

export class QrCodeComponent extends Component {
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
        let testId = this.getTestId();
        let userId = this.getUserId();
        let questionId = this.getQuestionId();

        const qrCode = this.dom.getElementById("qr-code");
        let qrImg = document.createElement("img");
        qrImg.setAttribute("src", 'https://wt148.fei.stuba.sk/bwte2/bwte2-api/qr-generator/'+testId+'/'+userId+'/'+questionId);
        qrCode.appendChild(qrImg);
    }

    eventsInitializer() {
    }

    getTestId() {
        let queryParams = window.location.search;
        let params = new URLSearchParams(queryParams);
        return params.get("codeTest");
    }

    getUserId() {
        let queryParams = window.location.search;
        let params = new URLSearchParams(queryParams);
        return params.get("studentId");
    }

    getQuestionId() {
        const questionInfo = domService.getAttribute(this, "questionInfo");
        const questionText = questionInfo.questionText;
        return questionText.match(/[^.]*/i)[0];
    }
}
