import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class GoalOrientedMealPlanning extends BaseComponent {
    #container = null;

    constructor(){
        super();
        this.loadCSS('GoalOrientedMealPlanning');
    }

    render(){
        if(this.#container){
            return this.#container;
        }

        this.#createContainer();
        this.#attachEventListener();
        return this.#container;
    }

    #createContainer(){
        // Create and configure the container element

        // Create input and button to calculate TDEE
        this.#container = document.createElement('div');
        this.#container.innerHTML = this.#getTemplate();
    }

    #getTemplate() {
        // Returns the HTML template for the component
        return `
            <input type="text" id="weightInput" placeholder="Enter weight:">
            <br/><br/>
            <input type="text" id="heightInput" placeholder="Enter height:">
            <br/><br/>
            <button id="calculateTDEE">Calculate TDEE</button>
        `;
    }

    #attachEventListener(){
        // Attach event listeners to the input and button elements
        const calculateTDEE = this.#container.querySelector('#calculateTDEE');
        const weightInput = this.#container.querySelector('#weightInput');
        const heightInput = this.#container.querySelector('#heightInput');

        // Calculate TDEE
        calculateTDEE.addEventListener('click', () => this.#handleTDEECalculation(weightInput, heightInput));
    }

    #handleTDEECalculation(weightInput, heightInput){
        const weight = weightInput.value;
        const height = heightInput.value;

        if(weight === '' || height === '') {
            alert('Please enter both your weight and height.');
            return;
        }

        // Clear inputs
        this.#clearInputs(weightInput, heightInput);
    }

    #clearInputs(weightInput, heightInput){
        weightInput.value = '';
        heightInput.value = '';
    }
}