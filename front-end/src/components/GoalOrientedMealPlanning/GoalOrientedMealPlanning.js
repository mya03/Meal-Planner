import { BaseComponent } from '../BaseComponent/BaseComponent.js';

export class GoalOrientedMealPlanning extends BaseComponent {
    #container = null;
    #optionsSection = null;

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
        this.#container.innerHTML = this.#getTemplateUserInput();
    }

    #getTemplateUserInput() {
        // Returns the HTML template for the component
        return `
        <section class='goal-oriented-meal-planner'>
            <div class="welcome-message">
                <h1>Welcome to Goal-Oriented Meal Planner!</h1>
                <h3 class="instruction">Please enter your information below to proceed.</h3>
            </div>
            <div class="TDEECalculation-container">
                <label for="weightInput">Enter weight (kg): </label>
                <input type="text" id="weightInput">
                <br/><br/>
                <label for="heightInput">Enter height (cm): </label>
                <input type="text" id="heightInput">
                <br/><br/>
                <label for="ageInput">Enter age: </label>
                <input type="text" id="ageInput">
                <br/><br/>
                <label for="activity">Activity: </label>
                <select id="activity">
                    <option>
                        Basal Metabolic Rate (BMR)
                    </option>
                    <option>
                        Sedentary: Little or No exercise
                    </option>
                    <option>
                        Light: Exercise 1-3 times/week
                    </option>
                    <option>
                        Moderate: Exercise 4-5 times/week
                    </option>
                    <option>
                        Active: Daily Exercise or Intense Exercise 3-4 times/week
                    </option>
                    <option>
                        Very Active: Intense Exercise 6-7 times/week
                    </option>
                    <option>
                        Extra Active: Very Intense Exercise Daily, or Physical Job
                    </option>
                </select>
                <br/><br/>
                <label for="gender-male">Male</label>
                <input type="radio" id="gender-male" name="gender"/>
                <label for="gender-female">Female</label>
                <input type="radio" id="gender-female" name="gender"/>
                <br/><br/>
                <button id="calculateTDEE">Calculate TDEE</button>
            </div>
        </section>
        `;
    }

    #createGoalOptions() {
        const containerSection = document.createElement('section');
        containerSection.classList.add("options");
        const container = document.createElement('div');
        container.classList.add('goal-options-container');

        // Lose weight option
        const loseWeightOption = document.createElement('div');
        loseWeightOption.classList.add('goal-option');
        loseWeightOption.classList.add('lose-weight-meal-option');
        const contentLoseWeightOption = document.createElement('div');
        loseWeightOption.appendChild(contentLoseWeightOption);
        contentLoseWeightOption.classList.add('meal-content');
        const headerLoseWeight = document.createElement('h2');
        headerLoseWeight.textContent = "Lose Weight";
        const descriptionLoseWeight = document.createElement('p');
        descriptionLoseWeight.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        contentLoseWeightOption.appendChild(headerLoseWeight);
        contentLoseWeightOption.appendChild(descriptionLoseWeight);

        // Maintain weight option
        const maintainWeightOption = document.createElement('div');
        maintainWeightOption.classList.add('goal-option');
        maintainWeightOption.classList.add('maintain-weight-meal-option');
        const contentMaintainWeightOption = document.createElement('div');
        maintainWeightOption.appendChild(contentMaintainWeightOption);
        contentMaintainWeightOption.classList.add('meal-content');
        const headerMaintainWeight = document.createElement('h2');
        headerMaintainWeight.textContent = "Maintain Weight";
        const descriptionMaintainWeight = document.createElement('p');
        descriptionMaintainWeight.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        contentMaintainWeightOption.appendChild(headerMaintainWeight);
        contentMaintainWeightOption.appendChild(descriptionMaintainWeight);

        // Gain weight option
        const gainWeightOption = document.createElement('div');
        gainWeightOption.classList.add('goal-option');
        gainWeightOption.classList.add('gain-weight-meal-option');
        const contentGainWeightOption = document.createElement('div');
        gainWeightOption.appendChild(contentGainWeightOption);
        contentGainWeightOption.classList.add('meal-content');
        const headerGainWeight = document.createElement('h2');
        headerGainWeight.textContent = "Gain Weight";
        const descriptionGainWeight = document.createElement('p');
        descriptionGainWeight.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        contentGainWeightOption.appendChild(headerGainWeight);
        contentGainWeightOption.appendChild(descriptionGainWeight);

        container.appendChild(loseWeightOption);
        container.appendChild(maintainWeightOption);
        container.appendChild(gainWeightOption);

        containerSection.appendChild(container);
        return containerSection;
    }

    #attachEventListener(){
        // Attach event listeners to the input and button elements
        const calculateTDEE = this.#container.querySelector('#calculateTDEE');
        const weightInput = this.#container.querySelector('#weightInput');
        const heightInput = this.#container.querySelector('#heightInput');
        const ageInput = this.#container.querySelector('#ageInput');

        // Calculate TDEE
        calculateTDEE.addEventListener('click', () => this.#handleTDEECalculation(weightInput, heightInput, ageInput));
    }

    #handleTDEECalculation(weightInput, heightInput, ageInput){
        const weight = weightInput.value;
        const height = heightInput.value;
        const age = ageInput.value;

        if(weight === '' || height === '' || age === '') {
            alert('Please enter all information.');
            return;
        }

        if(!this.#isNumeric(weight) || !this.#isNumeric(height) || !this.#isNumeric(age)) {
            alert('Please enter numbers only.');
            return;
        }

        // Calculate TDEE

        if(this.#optionsSection !== null) {
            this.#container.removeChild(this.#optionsSection);
        }
        this.#optionsSection = this.#createGoalOptions();
        this.#container.appendChild(this.#optionsSection);

        // Clear inputs
        this.#clearInputs(weightInput, heightInput);
    }

    #isNumeric(str) {
        if (typeof str != "string") return false;
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    #clearInputs(weightInput, heightInput){
        weightInput.value = '';
        heightInput.value = '';
    }
}