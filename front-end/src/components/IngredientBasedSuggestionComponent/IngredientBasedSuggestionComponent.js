import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

export class IngredientBasedSuggestionComponent extends BaseComponent{
    #container = null;
    #body = null;
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
        this.#attachEventListeners();
        return this.#container;
    }

    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement('div');;
        this.#container.classList.add("ingredient-based-suggestion")

        //append header
        this.#container.appendChild(this.#createHeaderComponent());

        //append search bar
        this.#container.appendChild(this.#createSearchComponent());

        //append page body
        this.#container.appendChild(this.#createBody());
        
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
          <input type="text" id="ingredientInput" placeholder="Enter your avaible ingredients. (multiple ingredients should be separated by comma and space)">
          <button id="findRecipeBtn">Find</button>
        `;
    }

    //create page body
    #createBody(){
        this.#body = document.createElement('div');
        this.#body.classList.add("recipes-body");
        this.#body.appendChild(this.#createFilterComponent());
        this.#body.appendChild(this.#createPlaceHolderRecipes());
        return this.#body;
    }
    
    //add filter box
    #createFilterComponent(){
        const filterBox = document.createElement('div');
        filterBox.classList.add("filter-box");
        filterBox.innerHTML += '<h3>Filter</h3>';

        //add filter options
        filterBox.appendChild(this.#getFilterOptionTemplate("veganFilter", "Vegan"));
        filterBox.appendChild(this.#getFilterOptionTemplate("vegetarianFilter", "Vegetarian"));
        filterBox.appendChild(this.#getFilterOptionTemplate("glutenFreeFilter", "Gluten Free"));
        filterBox.appendChild(this.#getFilterOptionTemplate("lactoseIntFilter", "Lactose Intolerance"));

        return filterBox;
    }

    #getFilterOptionTemplate(id, name){
        const filterOption = document.createElement('div');
        filterOption.classList.add("filter-option");
        filterOption.innerHTML = `
            <input type="checkbox" id="${id}">
            <label for="${id}">${name}</label>
        `
        
        return filterOption;
    }

    //container for recipes
    #createRecipes(recipes){
        this.#recipeComponent = document.createElement('div');
        this.#recipeComponent.classList.add("recipes-container");
        this.#recipeComponent.id = "recipes-container";

        for(let i=0; i<recipes.length; i++){
            console.log(recipes[i]);
            this.#recipeComponent.appendChild(this.#createRecipeComponent(recipes[i].title, recipes[i].image, recipes[i].summary));
        }
        return this.#recipeComponent;
    }

    //add recipe component
    #createRecipeComponent(name, image, summary){
        const recipeComponent = document.createElement('div');
        recipeComponent.classList.add("recipe-box");
        recipeComponent.innerHTML = this.#getRecipeImageTemplate(image);
        
        //add information box
        const recipeInfo = document.createElement('div');
        recipeInfo.classList.add("recipe-info");
        recipeInfo.innerHTML = this.#getRecipeInfoTemplate(name, summary);
        recipeComponent.appendChild(recipeInfo);

        return recipeComponent;
    }

    #getRecipeImageTemplate(image){
        // Returns the HTML template for the component
        return `
          <img src="${image}">
        `;
    }

    #getRecipeInfoTemplate(name, summary){
        return `
          <p>Recipe: ${name}<p>
          <p>Description: ${summary}<p>
        `;
    }

    #attachEventListeners(){
        const ingredientInput = this.#searchComponent.querySelector('#ingredientInput');
        const findRecipeBtn = this.#searchComponent.querySelector('#findRecipeBtn');

        const hub = EventHub.getInstance();
        findRecipeBtn.addEventListener("click", async()=> {
            await this.#handleFindRecipe(ingredientInput);
            hub.subscribe(Events.AllRecipes, (recipes) =>this.#createPlaceHolderRecipes());//placeholder recipes
            hub.subscribe("FoundRecipes", (foundRecipes) => this.#createPlaceHolderRecipes());//placeholder recipes
        });

        // hub.subscribe(Events.AllRecipes, (recipes) =>this.#displayRecipes(recipes));
        // hub.subscribe("FoundRecipes", (foundRecipes) => this.#displayRecipes(foundRecipes));
    }

    async #handleFindRecipe(ingredientInput){
        const ingredients = ingredientInput.value;
        const hub = EventHub.getInstance();
        const res = {};
        await hub.publishAsync(Events.FilterIngredients, {ingredients: ingredients, response: res});
        console.log(res.data);
        if (!ingredients) {
            alert('Please enter at least one ingredient.');
            return;
        }
        this.#publishFindRecipes(ingredients);

        //clear input of search box
        ingredientInput.value = "";
    }

    #publishFindRecipes(ingredients){
        const hub = EventHub.getInstance();
        hub.publish(Events.FindRecipes, ingredients);
    }

    #displayRecipes(recipes){
        //clear the recipes-container if they are current recipes displayed
        const recipeContainer = document.getElementById("recipes-container");
        if(recipeContainer){
            this.#body.removeChild(recipeContainer);
        }

        this.#body.appendChild(this.#createRecipes(recipes));
    }

    //create temp placeholder recipes
    #createPlaceHolderRecipes(){
        this.#recipeComponent = document.createElement('div');
        this.#recipeComponent.classList.add("recipes-container");
        this.#recipeComponent.id = "recipes-container";

        for(let i=0; i<5; i++){
            this.#recipeComponent.appendChild(this.#createRecipeComponent("", "https://www.svgrepo.com/show/508699/landscape-placeholder.svg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."));
        }
        return this.#recipeComponent;
    }

}
