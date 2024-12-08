import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

export class ProfileComponent extends BaseComponent{
    #container = null
    #userInfoComponent = null;
    #logged_in = false;
    #username = '';

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
    #createPreferenceContainer(){
        const recRecipeContainer = document.createElement('div');
        recRecipeContainer.classList.add('ProfileRecipeContainer');
        for (let i=0; i < 9;i++){
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('ProfileRecipeCard');
            recipeCard.innerHTML = `
                <div></div>
                <h3>Name of the Recipe</h3>
                <h4>Calories</h4>
            `;

            recRecipeContainer.appendChild(recipeCard);
        }
        return recRecipeContainer;
    }

    #attachEventListeners(){
        const hub = EventHub.getInstance();
        hub.subscribe('LogInSuccess', (data) =>this.#handleLoginSuccess(data));
    }

    #handleLoginSuccess(data){
        this.#logged_in = true;
        this.#username = data;
        this.#container.innerHTML = '';
        this.#container.appendChild(this.#createUserInfoContainer(this.#username));
        this.#container.appendChild(this.#createPreferenceContainer());

    }

}