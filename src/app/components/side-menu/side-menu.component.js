import {Component} from "../../shared/model/component/component.js";
import {domService} from "../../shared/services/dom.service.js";


const component = {
    selector: 'app-side-menu',
    templatePath: 'side-menu/side-menu.component.html',
    stylePaths: ['side-menu/side-menu.component.css'],
};

export class SideMenuComponent extends Component {
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
        this.setHeaderName();
        this.setHeaderColor();
    }

    eventsInitializer() {
        this.dom.getElementById("show-side-menu").addEventListener("click", this.showMenu);
        this.dom.getElementById("hide-side-menu").addEventListener("click", this.hideMenu)
        this.dom.getElementById("send-test-button").addEventListener('click', this.sendTest);
    }

    sendTest = () => {
        domService.createAndEmitEvent(this, "sendTest", true);
    };

    showMenu = () => {
        const sideMenu = this.dom.getElementById("side-menu");
        sideMenu.style.width = "400px";
    };

    hideMenu = () => {
        const sideMenu = this.dom.getElementById("side-menu");
        sideMenu.style.width = "0px";
    };

    readTime() {
        const time = domService.getAttribute(this, "time");
        this.dom.getElementById("timer").innerText = time + "";
    }

    setHeaderName() {
        const headerName = domService.getAttribute(this, "headerName");
        this.dom.getElementById("side-menu-header-name").innerText = headerName + "";
    }

    setHeaderColor() {
        const type = domService.getInlineAttribute(this, 'type');
        const header = this.dom.getElementById("side-menu-header");
        header.style.backgroundColor = domService.getColorByType(type);
    }
}
