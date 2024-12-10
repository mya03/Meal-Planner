import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

export class detailedRecipeComponent extends BaseComponent{
    #container = null; // Private variable to store the container element

    constructor(){
        super();
        this.loadCSS('detailedRecipeComponent');
    }

    render(data = null){
        this.#createContainer();
        this.#addRecipeImgContainer(data);
        this.#addRecipeInfo(data);
        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('detailed-container');
    }
    
    // add the thumbnail of recipe
    #addRecipeImgContainer(recipe = null){
        const recipeImgContainer = document.createElement('img');
        recipeImgContainer.id = 'recipeImgContainer';
        if(recipe) {
            recipeImgContainer.src = recipe.image;
        }
        recipeImgContainer.classList.add('detailed-flex-item');
        this.#container.appendChild(recipeImgContainer);
    }

    // add general and summary info of recipe
    #addRecipeInfo(recipe = null){
        const recipeInfoContainer = document.createElement('div');
        recipeInfoContainer.classList.add('detailed-flex-item');
        console.log("Recipe data:", recipe);

        if(recipe) {
            
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
                <li>Protein: ${recipe.nutrients[8]["amount"]} g</li>
                <li>Carbohydrates: ${recipe.nutrients[3]["amount"]} g</li>
                <li>Sugar: ${recipe.nutrients[5]["amount"]} g</li>
                <li>Fat: ${recipe.nutrients[1]["amount"]} g</li>
            </ul>
            `;
        }
        
        this.#container.appendChild(recipeInfoContainer);
        this.#addDivider();
        this.#addRecipeDetailedInfo(recipe);
    }

    // Get the calories from the recipe object
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
    #addRecipeDetailedInfo(recipe = null) {
        const recipeDetailedInfoContainer = document.createElement('div');
        recipeDetailedInfoContainer.classList.add('detailed-container')

        const ingredientSection = document.createElement('div');
        ingredientSection.classList.add('detailed-flex-item');
        ingredientSection.classList.add('detailed-ingredient');

        const ingredientText = document.createElement('h3');
        ingredientText.innerText = "Ingredients";
        const ingredientList = document.createElement('ul');

        const instructionSection = document.createElement('div');
        instructionSection.classList.add('detailed-flex-item');
        instructionSection.classList.add('instructionContainer');

        const instructionText = document.createElement('h3');
        instructionText.innerText = "Instructions";
        const instructionList = document.createElement('ol');

        
        // if there is a recipe data
        if (recipe){
            const ingredientsArray = recipe.ingredients.split(",")
            
            // render dynamically list of ingredients
            for(let i= 0; i < ingredientsArray.length; i++){
                const singleIngredient = document.createElement("li");
                ingredientList.appendChild(singleIngredient);
                singleIngredient.innerText = `${ingredientsArray[i]}`;
        
            }
            
            const instructionArray = recipe.instruction.split('.').filter(instructionArray => instructionArray.trim() !== '');;
            
            // render dynamically list of instruction
            for(let i= 0; i < instructionArray.length; i++){
                const singleInstruction = document.createElement("li");
                instructionList.appendChild(singleInstruction);
                singleInstruction.innerText = `${instructionArray[i]}`;
            }
        }
        ingredientSection.appendChild(ingredientText);
        ingredientSection.appendChild(ingredientList);

        instructionSection.appendChild(instructionText);
        instructionSection.appendChild(instructionList);

        recipeDetailedInfoContainer.appendChild(ingredientSection);
        recipeDetailedInfoContainer.appendChild(instructionSection);
        this.#container.appendChild(recipeDetailedInfoContainer);
    }
}       