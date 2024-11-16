//import { GoalOrientedMealPlanning } from "../GoalOrientedMealPlanning/GoalOrientedMealPlanning.js";
import { RecipeSharingComponent } from "../RecipeSharing/RecipeSharing2.js";

export class AppControllerComponent {
    #container = null;
    //#goalOrientedMealPlanning = null;
    #recipeSharingComponent = null;

    constructor() {
        //this.#goalOrientedMealPlanning = new GoalOrientedMealPlanning();
        this.#recipeSharingComponent = new RecipeSharingComponent();
    }

    render() {
        this.#createContainer();
        // Render Goal-Oriented Meal Planning
        //const mealPlanningElement = this.#goalOrientedMealPlanning.render();
        //this.#container.appendChild(mealPlanningElement);

        // Render Recipe Sharing Feature
        this.#container.appendChild(this.#recipeSharingComponent.render());
        return this.#container;
    }

    // Creates the main container element
    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('app-controller');
    }
}