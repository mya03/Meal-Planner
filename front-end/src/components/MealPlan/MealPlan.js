import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class MealPlan extends BaseComponent {
    #container = null;

    constructor() {
        super();
        this.loadCSS('MealPlan');
    }

    render(data = null) {
        this.#createContainer(data);
        this.#attachEventListener(data);
        return this.#container;
    }
    
    // add events to navigate to detailed recipes page when click images
    #attachEventListener(data = null) {
        const hub = EventHub.getInstance();

        const breakfastCard = this.#container.querySelector(".breakfast-photo");
        breakfastCard.addEventListener('click', () => {
            hub.publish('navigateToDetailedRecipe', data[0]);
        })

        const lunchCard = this.#container.querySelector(".lunch-photo");
        lunchCard.addEventListener('click', () => {
            hub.publish('navigateToDetailedRecipe', data[1]);
        })

        const dinnerCard = this.#container.querySelector(".dinner-photo");
        dinnerCard.addEventListener('click', () => {
            hub.publish('navigateToDetailedRecipe', data[2]);
        })
    }
    
    #createContainer(recipe = null) {
        this.#container = document.createElement('div');
        this.#container.innerHTML = this.#getTemplate(recipe);
    }

    #getTemplate(recipe = null) {

        // Placeholder incase there is no recipe
        let image0 = "https://th.bing.com/th?id=OIP.21XG1xTLOPD5KUE5jbEtUQHaGU&w=270&h=230&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2";
        let image1 = "components/GoalOrientedMealPlanning/images/maintainOption.jpeg";
        let image2 = "components/GoalOrientedMealPlanning/images/loseOption.jpeg"
        let title0 = "breakfast";
        let title1 = "lunch";
        let title2 = "dinner";

        // if there is recipe, set values to the data of that recipe
        if(recipe !== null) {
            image0 = recipe[0].image;
            image1 = recipe[1].image;
            image2 = recipe[2].image;

            title0 = recipe[0].title;
            title1 = recipe[1].title;
            title2 = recipe[2].title;
        }
            
        return `
        <section class="meal-plan" dir="ltr">
            <div class="meal">
                <h1>Breakfast.</h1>
                <h3>recipe recommendation</h3>
                <div class="recipe-card">
                    <div class="recipe-content">
                        <h3 id ="mealTitle">${title0}</h3>
                        <p>Click image to see the details of the recipe below or swipe left to see other meals. </p>
                    </div>
                    <div class="recipe-info">
                        <img class="recipe-photo breakfast-photo" src=${image0} alt="recipe-photo"</img>
                    </div>
                </div>
            </div>
            
            <div class="meal">
                <h1>Lunch.</h1>
                <h3>recipe recommendation</h3>
                <div class="recipe-card">
                    <div class="recipe-content">
                        <h3 id ="mealTitle">${title1}</h3>
                        <p>Click image to see the details of the recipe below or swipe left to see other meals. </p>
                    </div>
                    <div class="recipe-info">
                        <img class="recipe-photo lunch-photo" src=${image1} alt="recipe-photo"</img>
                    </div>
                </div>
            </div>
            
            <div class="meal">
                <h1>Dinner.</h1>
                <h3>recipe recommendation</h3>
                <div class="recipe-card">
                    <div class="recipe-content">
                        <h3 id ="mealTitle">${title2}</h3>
                        <p>Click image to see the details of the recipe below or swipe left to see other meals. </p>
                    </div>
                    <div class="recipe-info">
                        <img class="recipe-photo dinner-photo" src=${image2} alt="recipe-photo"</img>
                    </div>
                </div>
            </div>
        </section>
        `
    }
}