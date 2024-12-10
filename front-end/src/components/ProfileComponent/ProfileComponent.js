import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';
//import { SharedRecipeService } from '../../services/SharedRecipeService.js';

export class ProfileComponent extends BaseComponent{
    #container = null
    #userInfoComponent = null;
    #logged_in = false;
    #username = '';
    //#favorites = new Set(); //favorites tracking
    //#sharedRecipeContainer = document.createElement('div'); //shared recipe container
    //#sharedRecipes = [];

    constructor(){
        super();
        this.loadCSS('ProfileComponent');
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
        this.#container.classList.add("user-profile");

        if(this.#logged_in){
            this.#container.appendChild(this.#createUserInfoContainer(this.#username));
            this.#container.appendChild(this.#createPreferenceContainer());
/*
            //favorites section
            const favoriteSection = document.createElement('div');
            favoriteSection.classList.add('favorites-section');
            favoriteSection.innerHTML = `<h2>Your Favorite Recipes</h2>`;
            this.#container.appendChild(favoriteSection);

            //shared recipes section
            this.#container.appendChild(this.#sharedRecipeContainer);*/
        }else{
            this.#container.innerHTML = `<h3>You're not logged in</h3>`;
        }
        
    }

    #createUserInfoContainer(username) {
        this.#userInfoComponent = document.createElement('div');
        this.#userInfoComponent.classList.add("user-info");

        this.#userInfoComponent.innerHTML =  `<h1>Hello ${username}, you may like these recipes</h1>`;

        return this.#userInfoComponent;
    }

    //create preference section
    #createPreferenceContainer(RecipeArray){
        const recipes = RecipeArray;
        const recRecipeContainer = document.createElement('div');
        recRecipeContainer.classList.add('ProfileRecipeContainer');
        for (let i=0; i < 9;i++){
            const image = recipes[i].image || "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=";
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('ProfileRecipeCard');
            recipeCard.innerHTML = `
                <div><img src=${image}></div>
                <h3>${recipes[i].title}</h3>
                <p>Servings: ${recipes[i].servings}<p>
            `;

            recipeCard.addEventListener('click', ()=>{
                const hub = EventHub.getInstance();
                hub.publish('navigateToDetailedRecipe', recipes[i]);
            })
            recRecipeContainer.appendChild(recipeCard);
        }
        return recRecipeContainer;
    }

    async #attachEventListeners(){
        const hub = EventHub.getInstance();
        const response ={};
        const numRecipes = 9;
        const data = {numRecipes, response}
        await hub.publishAsync(Events.RandomRecipe, data);
        //await this.#loadSharedRecipes();
        hub.subscribe('LogInSuccess', (data) =>this.#handleLoginSuccess(data, response));
    }

    /*#handleFavoriteToggle(recipeId, isChecked) {
        if (isChecked) {
            if (this.#favorites.size >= 5) {
                alert('You can only have 5 favorite recipes. Please uncheck one.');
                return false; // Exit without further action
            }
            this.#favorites.add(recipeId);
        } else {
            this.#favorites.delete(recipeId);
        }
    
        this.#updateFavoriteDisplay();
    }

    async #loadSharedRecipes() {
        try {
            const response = await fetch('/api/sharedrecipes'); // Backend route
            const data = await response.json();
            this.#sharedRecipes = data.sharedRecipes; // Store fetched recipes
            this.#populateSharedRecipeContainer();
        } catch (error) {
            console.error('Failed to load shared recipes:', error);
        }
    }
    
    #populateSharedRecipeContainer() {
        this.#sharedRecipeContainer.innerHTML = ''; // Clear existing content
        this.#sharedRecipes.forEach((recipe) => {
            const card = this.#createSharedRecipeCard(recipe);
            this.#sharedRecipeContainer.appendChild(card);
    
            const checkbox = card.querySelector('.favorite-checkbox');
            checkbox.addEventListener('change', (event) => {
                this.#handleFavoriteToggle(recipe.id, event.target.checked);
            });
        });
    }

    #loadSharedRecipes() {
        // Updated listener to pass the event explicitly
        sharedRecipes.forEach((recipe) => {
            const card = this.#createSharedRecipeCard(recipe);
            this.#sharedRecipeContainer.appendChild(card);
    
            const checkbox = card.querySelector('.favorite-checkbox');
            checkbox.addEventListener('change', (event) => {
                this.#handleFavoriteToggle(recipe.id, event.target.checked);
            });
        });
    }

    #createSharedRecipeCard(recipe) {
        const card = document.createElement('div');
        card.classList.add('ProfileRecipeCard');

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <label>
                <input type="checkbox" data-recipe-id="${recipe.id}" class="favorite-checkbox">
                Favorite
            </label>
        `;

        card.querySelector('.favorite-checkbox').addEventListener('change', (event) => {
            const checkbox = event.target;
            this.#handleFavoriteToggle(recipe.id, checkbox.checked);
        });

        return card;
    }

    #getRecipeById(recipeId) {
        const recipes = Array.from(this.#sharedRecipes || []); // Use a preloaded shared recipes array
        return recipes.find((recipe) => recipe.id === recipeId);
    }

    #updateFavoriteDisplay() {
        const favoritesContainer = document.querySelector('.favorites-section');
        favoritesContainer.innerHTML = '<h2>Your Favorite Recipes</h2>';

        this.#favorites.forEach((recipeId) => {
            const recipe = this.#getRecipeById(recipeId); // Placeholder helper function
            const favoriteCard = document.createElement('div');
            favoriteCard.classList.add('ProfileRecipeCard');

            favoriteCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h3>${recipe.title}</h3>
            `;

            favoritesContainer.appendChild(favoriteCard);
        });
    }
*/
    #handleLoginSuccess(data, response){
        this.#logged_in = true;
        this.#username = data;
        this.#container.innerHTML = '';
        this.#container.appendChild(this.#createUserInfoContainer(this.#username));
        this.#container.appendChild(this.#createPreferenceContainer(response.data));

    }

}