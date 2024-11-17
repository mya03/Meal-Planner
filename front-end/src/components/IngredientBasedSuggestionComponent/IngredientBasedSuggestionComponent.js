import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

export class IngredientBasedSuggestionComponent extends BaseComponent{
    #container = null;
    #headerComponent = null;
    #searchComponent = null;
    #recipeComponent = null;


    constructor(){
        super();
        this.loadCSS('IngredientBasedSuggestionComponent');
    }

    render(){
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();
        return this.#container;
    }

    //FIX NEED TO DO 
    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement('div');;
        this.#container.classList.add("ingredient-based-suggestion")

        //append header
        this.#container.appendChild(this.#createHeaderComponent());

        //append search bar
        this.#container.appendChild(this.#createSearchComponent());

        //append recipes
        this.#container.appendChild(this.#createRecipes(4));
        
    }

    //add page header
    #createHeaderComponent(){
        this.#headerComponent = document.createElement('h1');
        this.#headerComponent.classList.add('recipe-header');
        this.#headerComponent.innerHTML = "Recipes";
        return this.#headerComponent;
    }

    //add the search box component
    #createSearchComponent(){
        this.#searchComponent = document.createElement('div');
        this.#searchComponent.classList.add("ingredient-input");
        this.#searchComponent.innerHTML = this.#getIngredientTemplate();
        return this.#searchComponent;
    }

    #getIngredientTemplate() {
        // Returns the HTML template for the component
        return `
          <input type="text" id="ingredientInput" placeholder="Enter your avaible ingredients">
          <button id="findRecipeBtn">Find</button>
        `;
    }

    #createRecipes(number){
        this.#recipeComponent = document.createElement('div');
        this.#recipeComponent.classList.add("recipes-container");
        for(let i=0; i<number; i++){
            this.#recipeComponent.appendChild(this.#createRecipeComponent());
        }
        return this.#recipeComponent;
    }

    //add recipe component
    #createRecipeComponent(){
        const recipeComponent = document.createElement('div');
        recipeComponent.classList.add("recipe-box");
        recipeComponent.innerHTML = this.#getRecipeImageTemplate();
        
        //add information box
        const recipeInfo = document.createElement('div');
        recipeInfo.classList.add("recipe-info");
        recipeInfo.innerHTML = this.#getRecipeInfoTemplate();
        recipeComponent.appendChild(recipeInfo);

        return recipeComponent;
    }

    #getRecipeImageTemplate(){
        // Returns the HTML template for the component
        return `
          <img src="https://yummione.com/wp-content/uploads/2019/02/banh-canh-cua-4.jpg">
        `;
    }
    #getRecipeInfoTemplate(){
        return `
          <p>Recipe: <p>
          <p>Description: <p>
        `;
    }



}