import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class NavigationBarComponent extends BaseComponent{
    #container = null; // Private variable to store the container element

    constructor(){
        super();
        this.loadCSS('NavigationBarComponent');
    }

    render(){
        if (this.#container) {
            return this.#container;
        }

        this.#createContainer();
        this.#setupContainerContent();
        this.#attachEventListeners();
       
        return this.#container;
    }

    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('navigation-bar');
    }

    #setupContainerContent() {
        this.#container.innerHTML = `
        <h2>Meal Planner</h2>
        <button id="homeBtn">Home</button>
        <button id="recipesBtn">Recipes</button>
        <button id="profileBtn">Profile</button>
        `;
    }

    #attachEventListeners(){
        const hub = EventHub.getInstance();
        const RecipesBtn = this.#container.querySelector('#recipeBtn');
        const homeBtn = this.#container.querySelector('#homeBtn');
        
        // Event listener for navigating pages
        homeBtn.addEventListener('click', () => {
            hub.publish('navigateToHome', null);
        });

    }



}