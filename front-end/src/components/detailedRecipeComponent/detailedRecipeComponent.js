import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

export class detailedRecipeComponent extends BaseComponent{
    #container = null; // Private variable to store the container element

    constructor(){
        super();
        this.loadCSS('detailedRecipeComponent');
    }

    render(){
        if (this.#container) {
            return this.#container;
        }
          
        this.#createContainer();
        this.#addRecipeImgContainer();
        this.#addRecipeInfo();
        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('detailed-container');
    }
    
    // add the thumbnail of recipe
    #addRecipeImgContainer(){
        const recipeImgContainer = document.createElement('div');
        recipeImgContainer.id = 'recipeImgContainer';
        recipeImgContainer.classList.add('detailed-flex-item');
        this.#container.appendChild(recipeImgContainer);
    }

    // add general and summary info of recipe
    async #addRecipeInfo(){
        const recipeInfoContainer = document.createElement('div');
        const hub = EventHub.getInstance();
        recipeInfoContainer.classList.add('detailed-flex-item');

        const randomRecipes = {};
        await hub.publishAsync(Events.RandomRecipe, {numRecipes: 3, response: randomRecipes});
        const recipe = randomRecipes.data[0];
        recipeInfoContainer.innerHTML = `
        <h1>${recipe.title}</h1>
        <p> 
            ${recipe.description}
        </p>
        <span>
            <p>Time: ${recipe.length}<p>
            <p>Serving Size: ${recipe.servings}</p>
        </span>
        <h3>Nutriton</h3>
        <ul>
            <li>Calories: ${this.#getCalories(recipe)} kcal</li>
            <li>Vitamin: A, E, C</li>
        </ul>
        `;
        this.#container.appendChild(recipeInfoContainer);
        this.#addDivider();
        this.#addRecipeDetailedInfo();
    }

    #getCalories(recipe) {
        return recipe.nutrients[0]["amount"];
    }

    // the divider between the upper section and lower section
    #addDivider() {
        const divider = document.createElement('div');
        divider.id = 'divider';
        this.#container.appendChild(divider);
    }

    // add ingredients and instructions section
    #addRecipeDetailedInfo() {
        const recipeDetailedInfoContainer = document.createElement('div');
        recipeDetailedInfoContainer.classList.add('detailed-container')


        const ingredientSection = document.createElement('div');
        ingredientSection.classList.add('detailed-flex-item');
        ingredientSection.classList.add('detailed-ingredient');
        ingredientSection.innerHTML = `
            <h3>Ingredients</h3>
            <ul>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
            </ul>
        `;

        const instructionSection = document.createElement('div');
        instructionSection.classList.add('detailed-flex-item');
        instructionSection.classList.add('instructionContainer');
        instructionSection.innerHTML = `
            <h3>Instructions</h3>
            <ol>
                <li>Lorem ipsum odor amet, consectetuer adipiscing elit. Faucibus dolor fermentum conubia viverra odio sapien dis rhoncus. Mollis parturient sociosqu maximus phasellus nec dignissim.</li>
                <li>Lorem ipsum odor amet, consectetuer adipiscing elit. Faucibus dolor fermentum conubia viverra odio sapien dis rhoncus. Mollis parturient sociosqu maximus phasellus nec dignissim.</l1>
            </ol>
        `;

        recipeDetailedInfoContainer.appendChild(ingredientSection);
        recipeDetailedInfoContainer.appendChild(instructionSection);
        this.#container.appendChild(recipeDetailedInfoContainer);
    }
    
}       