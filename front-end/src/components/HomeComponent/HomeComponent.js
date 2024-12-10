import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

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

    // Add thumbnail container
    #createIntroContainer(){
        const introContainer = document.createElement('div');
        introContainer.classList.add('homeIntroContainer');

        const textContainer = document.createElement('div');
        textContainer.classList.add('homeTextContainer');
        textContainer.innerHTML = `
        <h1>Hey There!</h1>
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
    async #createRecommendedRecipeContainer(){
        const recTitle = document.createElement('h2');
        const hub = EventHub.getInstance();
        recTitle.innerText = "Recommended Recipes";
        recTitle.id = "recTitle";
        const recRecipeContainer = document.createElement('div');
        recRecipeContainer.classList.add('homeRecipeContainer');
        recRecipeContainer.appendChild(recTitle);
        
        const res = {};
        await hub.publishAsync(Events.RandomRecipe, {numRecipes: 3, response: res});

        for (let i=0; i < 3;i++){
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('homeRecipeCard');
            recRecipeContainer.appendChild(recipeCard);
            
            let recipe = res.data[i];

            // if the recipe has no image, get placeholder image
            if(!recipe.image){
               recipe.image = "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=";
            };

            recipeCard.innerHTML = `
                <img src=${recipe.image}>
                <h3>${recipe.title}</h3>
                <h4>${this.#getCalories(recipe)} kcal</h4>
            `;
            recipeCard.addEventListener('click', () => {
                hub.publish('navigateToDetailedRecipe', res.data[i]);
            });
        }

        this.#container.appendChild(recRecipeContainer);
        this.#attachEventListeners();
    }

    #getCalories(recipe) {
        return recipe.nutrients[0]["amount"];
    }

    #attachEventListeners(){
        const hub = EventHub.getInstance();
        const discoverBtn = this.#container.querySelector('#discoverBtn');

        discoverBtn.addEventListener('click', () => {
            hub.publish('navigateToRecipes', null);
        })

    }
    
}