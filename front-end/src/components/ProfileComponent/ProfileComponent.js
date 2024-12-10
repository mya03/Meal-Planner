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
        hub.subscribe('LogInSuccess', (data) =>this.#handleLoginSuccess(data, response));
    }

    #handleLoginSuccess(data, response){
        this.#logged_in = true;
        this.#username = data;
        this.#container.innerHTML = '';
        this.#container.appendChild(this.#createUserInfoContainer(this.#username));
        this.#container.appendChild(this.#createPreferenceContainer(response.data));

    }

}