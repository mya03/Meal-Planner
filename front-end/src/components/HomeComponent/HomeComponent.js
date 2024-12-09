import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js'; 

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
        this.#attachEventListeners();
       
        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('container');
    }

    // Add thumbnail container
    #createIntroContainer(){
        const introContainer = document.createElement('div');
        introContainer.classList.add('homeIntroContainer');

        const textContainer = document.createElement('div');
        textContainer.classList.add('homeTextContainer');
        textContainer.innerHTML = `
        <h1>Hey there!</h1>
        <p>
            Having all the ingredients but don't know what to cook? Tired to think about what will I cook today?
            Meally is here to help you explore a world of culinary delights, perfectly tailored to your preference.
            From comfort food to healthy meals, we've got you covered. Click below to start your journey!
        <p>
        <button id="discoverBtn">Discover Recipes</button>
        `;

        const imgContainer = document.createElement('img');
        
        imgContainer.src = 'https://www.pngall.com/wp-content/uploads/2/Meal-PNG-Download-Image.png';
        //imgContainer.classList.add('homeImgContainer');
        imgContainer.id = "homeImg"

        introContainer.appendChild(textContainer);
        introContainer.appendChild(imgContainer);

        this.#container.appendChild(introContainer);
    }

    // Add recommended recipes section
    #createRecommendedRecipeContainer(){
        const recTitle = document.createElement('h2');
        recTitle.innerText = "Recommended Recipes";
        recTitle.id = "recTitle";
        const recRecipeContainer = document.createElement('div');
        recRecipeContainer.classList.add('homeRecipeContainer');
        recRecipeContainer.appendChild(recTitle);
        for (let i=0; i < 3;i++){
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('homeRecipeCard');
            recipeCard.innerHTML = `
                <div></div>
                <h3>Name of the Recipe</h3>
                <h4>Calories</h4>
            `;

            recRecipeContainer.appendChild(recipeCard);
        }

        this.#container.appendChild(recRecipeContainer);

    }

    #attachEventListeners(){
        const hub = EventHub.getInstance();
        const homeRecipeCards = this.#container.querySelectorAll('.homeRecipeCard');
        const discoverBtn = this.#container.querySelector('#discoverBtn');
        const welcomeTxt = this.#container.querySelector('#welcomeTxt');

        // Loop through each element in the List of recipe cards and attach event
        homeRecipeCards.forEach((homeRecipeCard) => {
            homeRecipeCard.addEventListener('click', () => {
                hub.publish('navigateToDetailedRecipe', null);
            });
        });

        discoverBtn.addEventListener('click', () => {
            hub.publish('navigateToRecipes', null);
        })

    }
    
}