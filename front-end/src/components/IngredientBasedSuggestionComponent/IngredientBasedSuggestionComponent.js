import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

export class IngredientBasedSuggestionComponent extends BaseComponent{
    #container = null;
    #body = null;
    #headerComponent = null;
    #searchComponent = null;
    #recipeComponent = null;
    #diet = '';

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
          <input type="text" id="ingredientInput" placeholder="Enter your avaible ingredients. (multiple ingredients should be separated by comma)">
          <button id="findRecipeBtn">Find</button>
        `;
    }

    //create page body
    #createBody(){
        this.#body = document.createElement('div');
        this.#body.classList.add("recipes-body");
        this.#body.appendChild(this.#createFilterComponent());
        this.#recipeComponent = document.createElement('div');
        this.#recipeComponent.classList.add("recipes-container");
        this.#recipeComponent.innerHTML = `<h3>Start searching for recipes</h3>`;
        this.#recipeComponent.id = "recipes-container";
        this.#body.appendChild(this.#recipeComponent);
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
            //image if the recipe in database has image or a generic food photo
            const image =  recipes[i].image || "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=";
            this.#recipeComponent.appendChild(this.#createRecipeComponent(recipes[i],recipes[i].title, image, recipes[i].description));
        }
        return this.#recipeComponent;
    }

    //add recipe component
    #createRecipeComponent(recipe,name, image, summary){
        const recipeComponent = document.createElement('div');
        recipeComponent.classList.add("recipe-box");
        recipeComponent.innerHTML = this.#getRecipeImageTemplate(image);
        
        //add information box
        const recipeInfo = document.createElement('div');
        recipeInfo.classList.add("recipe-info");
        recipeInfo.innerHTML = this.#getRecipeInfoTemplate(name, summary);
        recipeComponent.appendChild(recipeInfo);

        //add event listener to each recipe card for users to view the full recipe details
        recipeComponent.addEventListener('click', ()=>{
            const hub = EventHub.getInstance();
            hub.publish('navigateToDetailedRecipe', recipe);
        })
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
        const veganFilter = this.#body.querySelector('#veganFilter');
        const vegetarianFilter = this.#body.querySelector('#vegetarianFilter');
        const glutenFreeFilter = this.#body.querySelector('#glutenFreeFilter');
        const lactoseIntFilter = this.#body.querySelector('#lactoseIntFilter');

        //add event listener to each filter checkbox
        veganFilter.addEventListener('change', ()=>{this.#diet += "vegan,"});
        vegetarianFilter.addEventListener('change', ()=>{this.#diet += 'vegetarian,'});
        glutenFreeFilter.addEventListener('change', ()=>{this.#diet += 'glutenFree,'});
        lactoseIntFilter.addEventListener('change', ()=>{this.#diet += 'dairyFree,'});


        const hub = EventHub.getInstance();
        findRecipeBtn.addEventListener("click", async()=> {
            await this.#handleFindRecipe(ingredientInput);
        });

        hub.subscribe("FoundRecipes", (foundRecipes) => this.#displayRecipes(foundRecipes));
        hub.subscribe("FoundFilterRecipes", (foundRecipes) => this.#displayRecipes(foundRecipes));
    }

    //method to publish event to call to back-end to fetch recipe data
    async #handleFindRecipe(ingredientInput){
        const ingredients = ingredientInput.value;
        const hub = EventHub.getInstance();
        const res = {};
        
        if (!ingredients) {
            alert('Please enter at least one ingredient.');
            return;
        }
        if(!this.#diet){
            await hub.publishAsync(Events.FilterIngredients, {ingredients: ingredients, response: res});
        }
        //use a different endpoint if users select filter
        else{
            const resIn = {};
            const resDiet = {};
            const ingredientsObj = {ingredients: ingredients, response: resIn};
            const dietObj = {diet: this.#diet, response: resDiet};
            await hub.publishAsync(Events.FilterRecipes, {ingredientsObj, dietObj, resObj: res});
        }

        //clear input of search box and filter box
        ingredientInput.value = "";
        this.#diet = '';
        const veganFilter = this.#body.querySelector('#veganFilter');
        const vegetarianFilter = this.#body.querySelector('#vegetarianFilter');
        const glutenFreeFilter = this.#body.querySelector('#glutenFreeFilter');
        const lactoseIntFilter = this.#body.querySelector('#lactoseIntFilter');
        veganFilter.checked = false;
        vegetarianFilter.checked = false;
        glutenFreeFilter.checked = false;
        lactoseIntFilter.checked = false;
        return res;
    }

    //method to handle displaying the recipes found
    #displayRecipes(recipes){
        //clear the recipes-container if they are current recipes displayed
        const recipeContainer = document.getElementById("recipes-container");
        if(recipeContainer){
            this.#body.removeChild(this.#recipeComponent);
        }

        if(recipes.length !=0){
            this.#body.appendChild(this.#createRecipes(recipes));
        }else{
            this.#recipeComponent.innerHTML = `<h3>Sorry, no recipes matches your search in the database...</h3>`;
            this.#body.appendChild(this.#recipeComponent);
        }
        
    }

}