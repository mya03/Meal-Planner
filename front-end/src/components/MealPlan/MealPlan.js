import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class MealPlan extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('MealPlan');
    }

    render(data) {
        if(this.#container) {
            return this.#container;
        }

        this.#createContainer();
        this.#attachEventListener();
        return this.#container;
    }
    
    #attachEventListener() {
        const hub = EventHub.getInstance();
        const recipeCards = this.#container.getElementsByClassName("recipe-photo");
        for(let recipe of recipeCards) {
            recipe.addEventListener('click', () => {
                hub.publish('navigateToDetailedRecipe', null);
            })
        }
    }
    
    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.innerHTML = this.#getTemplate();
    }

    #getTemplate() {
        return `
        <section class="meal-plan" dir="ltr">
            <div class="meal">
                <h1>Breakfast.</h1>
                <h3>recipe recommendation</h3>
                <div class="recipe-card">
                    <div class="recipe-content">
                        <p>Click image to see the details of the recipe below or swipe left to see other meals. </p>
                    </div>
                    <div class="recipe-info">
                        <img class="recipe-photo" src="components/GoalOrientedMealPlanning/images/gainOption.jpeg" alt="recipe-photo"</img>
                    </div>
                </div>
            </div>
            
            <div class="meal">
                <h1>Lunch.</h1>
                <h3>recipe recommendation</h3>
                <div class="recipe-card">
                    <div class="recipe-content">
                        <p>Click image to see the details of the recipe below or swipe left to see other meals. </p>
                    </div>
                    <div class="recipe-info">
                        <img class="recipe-photo" src="components/GoalOrientedMealPlanning/images/maintainOption.jpeg" alt="recipe-photo"</img>
                    </div>
                </div>
            </div>
            
            <div class="meal">
                <h1>Dinner.</h1>
                <h3>recipe recommendation</h3>
                <div class="recipe-card">
                    <div class="recipe-content">
                        <p>Click image to see the details of the recipe below or swipe left to see other meals. </p>
                    </div>
                    <div class="recipe-info">
                        <img class="recipe-photo" src="components/GoalOrientedMealPlanning/images/loseOption.jpeg" alt="recipe-photo"</img>
                    </div>
                </div>
            </div>
        </section>
        `
    }
}