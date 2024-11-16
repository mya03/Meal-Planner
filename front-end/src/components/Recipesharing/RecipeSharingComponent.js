//import './RecipeSharing.css';

export class RecipeSharingComponent {
    #container = null;

    constructor() {
        this.#container = document.createElement('div');
        this.#container.classList.add('recipe-sharing');
    }

    render() {
        this.#container.innerHTML = `
            <h2>Share Your Recipe</h2>
            <form id="recipe-form">
                <label for="recipe-title">Recipe Title:</label>
                <input type="text" id="recipe-title" name="recipe-title" required>
                
                <label for="recipe-ingredients">Ingredients:</label>
                <textarea id="recipe-ingredients" name="recipe-ingredients" required></textarea>
                
                <label for="recipe-steps">Cooking Steps:</label>
                <textarea id="recipe-steps" name="recipe-steps" required></textarea>
                
                <button type="submit">Share Recipe</button>
            </form>
            <div id="shared-recipes">
                <h3>Shared Recipes:</h3>
                <ul id="recipe-list"></ul>
            </div>
        `;
        this.#addFormSubmitHandler();
        return this.#container;
    }

    #addFormSubmitHandler() {
        const form = this.#container.querySelector('#recipe-form');
        const recipeList = this.#container.querySelector('#recipe-list');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather input data
            const title = form['recipe-title'].value;
            const ingredients = form['recipe-ingredients'].value;
            const steps = form['recipe-steps'].value;

            // Create a new recipe list item
            const recipeItem = document.createElement('li');
            recipeItem.innerHTML = `
                <h4>${title}</h4>
                <p><strong>Ingredients:</strong> ${ingredients}</p>
                <p><strong>Steps:</strong> ${steps}</p>
            `;

            // Append to the recipe list
            recipeList.appendChild(recipeItem);

            // Clear form inputs
            form.reset();
        });
    }
}