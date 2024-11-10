import { GoalOrientedMealPlanning } from "../GoalOrientedMealPlanning/GoalOrientedMealPlanning.js";

export class AppControllerComponent {
    #container = null;
    #goalOrientedMealPlanning = null;

    constructor() {
        this.#goalOrientedMealPlanning = new GoalOrientedMealPlanning();
    }

    render() {
        this.#createContainer();
        this.#container = this.#goalOrientedMealPlanning.render();
        return this.#container;
    }

    // Creates the main container element
    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('app-controller');
    }
}