import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { EventHub } from '../../eventhub/EventHub.js';
import { Events } from '../../eventhub/Events.js';

export class ProfileComponent extends BaseComponent{
    #container = null
    #userInfoComponent = null;

    constructor(){
        super();
        this.loadCSS('ProfileComponent');
    }

    render(){
        if (this.#container) {
            return this.#container;
        }
        this.#createContainer();
        //this.#attachEventListeners();
        return this.#container;
    }

    #createContainer() {
        // Create and configure the container element
        this.#container = document.createElement('div');;
        this.#container.classList.add("user-profile");

        this.#container.appendChild(this.#createUserInfoContainer());
        this.#container.appendChild(this.#createPreferenceContainer());
    }

    #createUserInfoContainer() {
        this.#userInfoComponent = document.createElement('div');
        this.#userInfoComponent.classList.add("user-info");

        this.#userInfoComponent.innerHTML = "<h1>Hello Siri</h1>";

        //add info box
        this.#userInfoComponent.appendChild(this.#createInfoBox(5, 112));

        return this.#userInfoComponent;
    }

    #createInfoBox(height, weight) {
        const infoBox = document.createElement('div');
        infoBox.classList.add("info-box");
        infoBox.innerHTML = `
          <p>Height: ${height} ft<p>
          <p>Weight: ${weight} lbs<p>
        `;
        return infoBox;
    }

    #createPreferenceContainer() {
        const preferenceContainer = document.createElement('div');
        preferenceContainer.classList.add("preference-container");
        preferenceContainer.innerHTML = "<h1>Preferences</h1>";
        preferenceContainer.appendChild(this.#createPreferenceBox());
        return preferenceContainer;
    }

    #createPreferenceBox(){
        const preferenceBox = document.createElement('div');
        preferenceBox.classList.add("preference-box");
        preferenceBox.innerHTML += `<h3>Dietary Restrictions</h3>`;
        preferenceBox.appendChild(this.#getPreferenceTemplate("Vegan", "Vegetarian", "Gluten Free"));
        preferenceBox.innerHTML += `<h3>Health & Fitness Goals</h3>`;
        preferenceBox.appendChild(this.#getPreferenceTemplate("Low Carb", "High Protein", "Low Fat"));
        preferenceBox.innerHTML += `<h3>Cuisine Preferences</h3>`;
        preferenceBox.appendChild(this.#getPreferenceTemplate("Western", "Asian", "Mediterranean"));
        return preferenceBox;
    }
    

    #getPreferenceTemplate(option1, option2, option3){
        const options = document.createElement('div');
        options.classList.add("preference-options");
        options.innerHTML = `
        <button>${option1}</button>
        <button>${option2}</button>
        <button>${option3}</button>
        `;
        return options;
    }

}