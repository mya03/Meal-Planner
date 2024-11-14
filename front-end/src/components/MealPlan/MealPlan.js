import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class MealPlan extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('MealPlan');
    }

    render() {
        if(this.#container) {
            return this.#container;
        }

        this.#createContainer();
        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.innerHTML = this.#getTemplate();
    }

    #getTemplate() {
        return `
        <div class="meal-plan-title">
            <h2>Meal Plan</h2>
        </div>
        <div class="meal-options">
            <div class="box">
                <div class="imageBox">
                    <img src="components/GoalOrientedMealPlanning/images/gainOption.jpeg" alt="">
                </div>
                <div class="description">
                    <div class="content-imageBox">
                        <h2>Breakfast</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="imageBox">
                    <img src="components/GoalOrientedMealPlanning/images/loseOption.jpeg" alt="">
                </div>
                <div class="description">
                    <div class="content-imageBox">
                        <h2>Lunch</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="imageBox">
                    <img src="components/GoalOrientedMealPlanning/images/maintainOption.jpeg" alt="">
                </div>
                <div class="description">
                    <div class="content-imageBox">
                        <h2>Dinner</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}