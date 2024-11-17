import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin leo nunc, placerat eget pellentesque ut, tincidunt sed nunc. Proin condimentum ante at facilisis pretium. Nullam a lorem sed turpis iaculis tempus. Nunc blandit massa vitae lacus dictum, nec ultricies dui aliquam.</p>
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin leo nunc, placerat eget pellentesque ut, tincidunt sed nunc. Proin condimentum ante at facilisis pretium. Nullam a lorem sed turpis iaculis tempus. Nunc blandit massa vitae lacus dictum, nec ultricies dui aliquam.</p>
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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin leo nunc, placerat eget pellentesque ut, tincidunt sed nunc. Proin condimentum ante at facilisis pretium. Nullam a lorem sed turpis iaculis tempus. Nunc blandit massa vitae lacus dictum, nec ultricies dui aliquam.</p>
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