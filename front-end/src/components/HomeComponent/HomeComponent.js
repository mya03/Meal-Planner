import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class HomeComponent extends BaseComponent {
    #container = null; // Private variable to store the container element

    constructor(){
        super();
        this.loadCSS('HomeComponent');
    }

    render(){
        if (this.#container) {
            return this.#container;
        }
          
        this.#createContainer();
        this.#createIntroContainer();
        this.#createRecommendedRecipeContainer();
       
        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('container');
    }

    #createIntroContainer(){
        const introContainer = document.createElement('div');

        const textContainer = document.createElement('div');
        textContainer.innerHTML = `
        <h2>Hey Jack</h2>
        <p>Some text<p>
        <button>Discover Receipts</button>
        `;

        const imgContainer = document.createElement('div');

        introContainer.appendChild(textContainer);
        introContainer.appendChild(imgContainer);

        this.#container.appendChild(introContainer);
    }

    #createRecommendedRecipeContainer(){
        const recRecipeContainer = document.createElement('div');

        for (let i=0; i < 3;i++){
            const recipeCard = document.createElement('div');
            recipeCard.innerHTML = `
                <img>
                <h3>Name of the Recipe</h3>
                <h4>Calories</h4>
            `;

            recRecipeContainer.appendChild(recipeCard);
        }

        this.#container.appendChild(recRecipeContainer);


    }
    
}