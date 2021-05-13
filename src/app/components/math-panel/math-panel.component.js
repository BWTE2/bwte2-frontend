import {domService} from "../../shared/services/dom.service.js";
import {Component} from "../../shared/model/component/component.js";

const component = {
    selector: 'app-math-panel',
    templatePath: 'math-panel/math-panel.component.html',
    stylePaths: ['math-panel/math-panel.component.css'],
};

export class MathPanelComponent extends Component {
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
        this.generateButtons("Operácie");
    }

    eventsInitializer() {
    }

    generateButtons(cat)
    {
        var panel = this.dom.getElementById("math-panel");

        var panelContent = document.createElement("div");
        panelContent.id = "panelContent";
        panel.appendChild(panelContent);

        var panelContentSymbols = document.createElement("div");
        panelContentSymbols.id = "panelContentSymbols";
        panel.appendChild(panelContentSymbols);

        let zatvorky = {
            "{": "{",
            "}": "}",
            "[": "[",
            "]": "]",
            "(": "(",
            ")": ")"
        }
        let funkcie = {
            "log": "\\log",
            "ln": "\\ln",
            "sin": "\\sin",
            "cos": "\\cos",
            "tan": "\\tan",
            "cot": "\\cot",
            "arcsin": "\\arcsin",
            "arccos": "\\arccos",
        }

        let operacie = {
            "≠": "\\ne",
            "=": "=",
            "+": "+",
            "-": "-",
            "*": "*",
            "/": "/",
            "^": "^",
            "√": "\\sqrt",
            "∫": "\\int",
            "∮": "\\oint",
            "∑": "\\sum",
            "∏": "\\prod",
            "lim": "\\lim",
        }

        let konstanty = {
            "π": "\\pi",
            "e": "e",
            "λ": "\\lambda",
        }

        var map = new Map();
        map.set("Operácie", operacie);
        map.set("Funkcie", funkcie);
        map.set("Konštanty", konstanty);
        map.set("Zátvorky", zatvorky);

        for (let e of map)
        {
            var btn = document.createElement("button");
            btn.innerText = e[0];
            btn.addEventListener('click', (e) => {
                panelContent.remove();
                panelContentSymbols.remove();
                this.generateButtons(e.target.innerText);
            }, false);
            panelContent.appendChild(btn);
        }

        for(var key in map.get(cat))
        {
            var newbtn = document.createElement("button");
            newbtn.innerHTML = key;

            newbtn.addEventListener("click",
                (e) => {
                    domService.createAndEmitEvent(this, "fnc123", map.get(cat)[e.target.innerText]);
                });

            panelContentSymbols.appendChild(newbtn);
        }
    }
}