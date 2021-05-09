import {Component} from "../../shared/model/component/component.js";
import {domService} from "../../shared/services/dom.service.js";
import lottieWeb from 'https://cdn.skypack.dev/lottie-web';

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
        this.animation = null;
    }

    onInit() {
        this.loadLottieAnimation();
        this.attributesInitializer();
        this.eventsInitializer();
    }

    attributesInitializer() {
        this.setHeaderName();
        this.setHeaderColor();
    }

    eventsInitializer() {
        this.dom.getElementById("side-menu-swap-button").addEventListener("click", this.swapMenu);
        this.dom.getElementById("send-test-button").addEventListener('click', this.sendTest);
    }

    swapMenu = () => {

        const menu = this.dom.getElementById("side-menu");
        const width = menu.style.width;

        if (width === '0px' || width === '') {
            this.showMenu();
        } else {
            this.hideMenu();
        }
    };

    setAnimation = (animation) => {
        this.animation = animation;
    };

    sendTest = () => {
        domService.createAndEmitEvent(document, "sendTest", true);
    };

    showMenu() {
        const sideMenu = this.dom.getElementById("side-menu");
        const header = this.dom.getElementById("side-menu-header");
        header.style.borderBottomRightRadius = '0px';
        sideMenu.style.width = "400px";
        console.log(this.animation)
        this.animation.setSpeed(1.8);
        this.animation.playSegments([30, 60], true);
    }

    hideMenu() {
        const sideMenu = this.dom.getElementById("side-menu");
        const header = this.dom.getElementById("side-menu-header");
        header.style.borderBottomRightRadius = '20px';
        sideMenu.style.width = "0px";
        this.animation.setSpeed(1.8);
        this.animation.playSegments([50, 30], true);

    }

    loadLottieAnimation() {
        this.animation = lottieWeb.loadAnimation({
            container: this.dom.getElementById('side-menu-swap-button'),
            path: '../../../assets/animations/menuAnimation.json',
            renderer: 'svg',
            loop: false,
            autoplay: false,
        });
    }

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
