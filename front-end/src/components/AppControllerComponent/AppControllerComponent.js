import { GoalOrientedMealPlanning } from "../GoalOrientedMealPlanning/GoalOrientedMealPlanning.js";
import { MealPlan } from "../MealPlan/MealPlan.js";

export class AppControllerComponent {
    #container = null;
    #goalOrientedMealPlanning = null;
    #mealPlan = null;

    constructor() {
        this.#goalOrientedMealPlanning = new GoalOrientedMealPlanning();
        this.#mealPlan = new MealPlan();
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