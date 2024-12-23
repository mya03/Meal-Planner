import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class RecipeSharingComponent extends BaseComponent {
    #container = null;
    #formComponent = null;
    #listComponent = null;
    #recipes = [];
  
    constructor() {
        super();
        this.loadCSS('RecipeSharing');
    }
  
    render() {
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();
        this.#attachEventListeners();
        return this.#container;
    }
  
    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('recipe-sharing-container');
  
        // Append header
        const header = document.createElement('h1');
        header.textContent = 'Share Your Recipe!';
        this.#container.appendChild(header);
  
        // Append form
        this.#container.appendChild(this.#createFormComponent());
  
        // Append recipe list
        this.#container.appendChild(this.#createListComponent());
    }
  
    #createFormComponent() {
        this.#formComponent = document.createElement('form');
        this.#formComponent.classList.add('recipe-form');
        this.#formComponent.innerHTML = `
            <div>
                <label for="username">Your Username:</label>
                <input type="text" id="username" name="username" placeholder="Enter your name">
            </div>
            <div>
                <label for="recipeTitle">Recipe Title:</label>
                <input type="text" id="recipeTitle" placeholder="Recipe title" required>
            </div>
            <div>
                <label for="ingredients">Ingredients:</label>
                <input type="text" id="ingredients" placeholder="Enter ingredients, separated by commas" required>
            </div>
            <div>
                <label for="steps">Cooking Steps:</label>
                <input type="text" id="steps" placeholder="Enter cooking steps" required>
            </div>
            <div>
                <label for="image">Upload Image:</label>
                <input type="file" id="image" accept="image/*">
            </div>
            <button type="submit">Share Recipe</button>
        `;
        return this.#formComponent;
    }
  
    #createListComponent() {
        this.#listComponent = document.createElement('div');
        this.#listComponent.classList.add('recipe-list');
        this.#listComponent.innerHTML = `
            <h2>Shared Recipes:</h2>
            <ul id="recipeItems"></ul>
        `;
        return this.#listComponent;
    }
  
    #attachEventListeners() {
        this.#formComponent.addEventListener('submit', (e) => this.#handleFormSubmit(e));
    }
  
    #handleFormSubmit(event) {
        event.preventDefault();
  
        const username = this.#formComponent.querySelector('#username').value.trim();
        const title = this.#formComponent.querySelector('#recipeTitle').value.trim();
        const ingredients = this.#formComponent.querySelector('#ingredients').value.trim();
        const steps = this.#formComponent.querySelector('#steps').value.trim();
        const imageFile = this.#formComponent.querySelector('#image').files[0];
  
        if (!title || !ingredients || !steps || !username) {
            alert('Please fill out all fields.');
            return;
        }
  
        let imageUrl = '';
        if (imageFile) {
            imageUrl = URL.createObjectURL(imageFile);
        }
  
        const newRecipe = { username, title, ingredients, steps, imageUrl };
        this.#recipes.push(newRecipe);
        this.#displayRecipes();
  
        this.#formComponent.reset();
    }
  
    #displayRecipes() {
        const recipeItems = this.#listComponent.querySelector('#recipeItems');
        recipeItems.innerHTML = ''; // Clear existing recipes
  
        this.#recipes.forEach((recipe) => {
            const recipeItem = document.createElement('li');
            recipeItem.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    ${recipe.imageUrl ? `<img src="${recipe.imageUrl}" alt="${recipe.title}" style="width: 100px; height: auto; margin-right: 10px; border-radius: 8px;">` : ''}
                    <div>
                        <strong>${recipe.title}</strong>
                        <p><strong>Shared by:</strong> ${recipe.username}</p>
                        <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                        <p><strong>Steps:</strong> ${recipe.steps}</p>
                    </div>
                </div>
            `;
            recipeItems.appendChild(recipeItem);
        });
    }
}