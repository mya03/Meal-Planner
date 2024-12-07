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
        <h2>Meally</h2>
        <button id="homeBtn">Home</button>
        <button id="recipesBtn">Recipes</button>
        <button id="plannerBtn">Meal Planner</button>
        <button id="profileBtn">Profile</button>
        <button id="shareBtn">Share Recipes</button>
        <button id="loginBtn">Log In</button>
        `;
    }

    #attachEventListeners(){
        const hub = EventHub.getInstance();
        const recipesBtn = this.#container.querySelector('#recipesBtn');
        const homeBtn = this.#container.querySelector('#homeBtn');
        const plannerBtn = this.#container.querySelector('#plannerBtn');
        const profileBtn = this.#container.querySelector('#profileBtn');
        const shareBtn = this.#container.querySelector('#shareBtn');
        const loginBtn = this.#container.querySelector('#loginBtn');
    
        
        // Event listener for navigating pages
        homeBtn.addEventListener('click', () => {
            hub.publish('navigateToHome', null);
        });

        recipesBtn.addEventListener('click', () => {
            hub.publish('navigateToRecipes', null);
        });

        plannerBtn.addEventListener('click', () => {
            hub.publish('navigateToGoal', null);
        });

        profileBtn.addEventListener('click', () => {
            hub.publish('navigateToProfile', null);
        });

        shareBtn.addEventListener('click', () => {
            hub.publish('navigateToShare', null);
        });

        loginBtn.addEventListener('click', () => {
            hub.publish('navigateToLogIn', null);
        });
        
    }



}