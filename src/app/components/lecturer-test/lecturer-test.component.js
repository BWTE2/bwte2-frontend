import {Component} from "../../shared/model/component/component.js";
import {domService} from "../../shared/services/dom.service.js";
import {TestMakerComponent} from "./test-maker/test-maker.component.js";
import {TestTableComponent} from "./test-table/test-table.component.js";
import {ActiveTestDetailComponent} from "./active-test-detail/active-test-detail.component.js";
import {NonActiveTestDetailComponent} from "./non-active-test-detail/non-active-test-detail.component.js";


const component = {
    selector: 'app-lecturer-test',
    templatePath: 'lecturer-test/lecturer-test.component.html',
    stylePaths: ['lecturer-test/lecturer-test.component.css'],
};

export class LecturerTestComponent extends Component {
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
        this.setName();
    }

    eventsInitializer() {
        const sideMenu = this.dom.getElementById("side-menu");
        const allTests = this.dom.querySelector("APP-TEST-TABLE");
        sideMenu.addEventListener("menuSwap", this.menuSwapped);
        sideMenu.addEventListener("openCreateTest", this.openTestBuilder);
        sideMenu.addEventListener("showAllTests", this.openAllTests);
        document.addEventListener("updateAllTests", this.openAllTests);
        allTests.addEventListener("testDetail", this.openTestDetail)
    }

    menuSwapped = (e) => {
        const formContainer = this.dom.getElementById("dynamic-test-form");
        if (e.detail === "400px") {
            formContainer.style.marginLeft = "0px";
        } else {
            formContainer.style.marginLeft = "400px";
        }
    }

    openTestBuilder = () => {
        this.changePage(TestMakerComponent);
    };

    openAllTests = () => {
        this.changePage(TestTableComponent);
        this.eventsInitializer();
    };

    openTestDetail = (response) => {
        const test = response.detail;
        if (test.is_active === '1') {
            this.activeTestDetail(test);
        } else {
            this.nonActiveTestDetail(test);
        }
        domService.createAndEmitEvent(document, "testDetail", true);
    };

    activeTestDetail(test) {
        const attribute = {name: 'testCode', data: test.code}
        this.changePageAndSendAttribute(ActiveTestDetailComponent, attribute);
    }

    nonActiveTestDetail(test) {
        const attribute = {name: 'test', data: test}
        this.changePageAndSendAttribute(NonActiveTestDetailComponent, attribute);
    }


    changePageAndSendAttribute(component, attribute) {
        const container = this.dom.getElementById("dynamic-test-form");
        domService.changeDomAndSetAttribute(container, component, attribute);
    }

    changePage(component) {
        const container = this.dom.getElementById("dynamic-test-form");
        domService.changeDom(container, component);
    }

    setName() {
        const actualName = "Lubos Sremanak";
        const sideMenu = this.dom.getElementById("side-menu");
        domService.setAttribute(sideMenu, "headerName", actualName);
    }


}
