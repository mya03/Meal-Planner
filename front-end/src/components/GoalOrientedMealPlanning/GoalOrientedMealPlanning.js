import { BaseComponent } from '../BaseComponent/BaseComponent.js';
import { MealPlan } from '../MealPlan/MealPlan.js';
import { EventHub } from '../../eventhub/EventHub.js';

export class GoalOrientedMealPlanning extends BaseComponent {
    #container = null;
    #optionsSection = null;
    #tdeeOutput = null;

    constructor(){
        super();
        this.loadCSS('GoalOrientedMealPlanning');
        this.#tdeeOutput = document.createElement('h1');
        this.#tdeeOutput.setAttribute("id", "tdeeOutput");

        // Create options
        this.#optionsSection = this.#createGoalOptions();
        this.#optionsSection.setAttribute("id", "options-section");
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
        this.#container.classList.add('container-goal-oriented-meal-planner');
        this.#container.innerHTML = this.#getTemplateUserInput();
    }

    #getTemplateUserInput() {
        // Returns the HTML template for the component
        return `
        <section class='goal-oriented-meal-planner' id='goal-oriented-meal-planner'>
            <div class="welcome-message">
                <h1 id="title">Goal-Oriented Meal Planner.</h1>
            </div>
            <div class="TDEECalculation-container">
                <label for="weightInput">Enter weight (kg): </label>
                <input type="text" id="weightInput">
                <br/><br/>
                <label for="heightInput">Enter height (cm): </label>
                <input type="text" id="heightInput">
                <br/><br/>
                <label for="ageInput">Enter age (years): </label>
                <input type="text" id="ageInput">
                <br/><br/>
                <label for="activity">Activity: </label>
                <select id="activity">
                    <option value="1">
                        Basal Metabolic Rate (BMR)
                    </option>
                    <option value="2">
                        Sedentary: Little or No exercise
                    </option>
                    <option value="3">
                        Light: Exercise 1-3 times/week
                    </option>
                    <option value="4">
                        Moderate: Exercise 4-5 times/week
                    </option>
                    <option value="5">
                        Active: Daily Exercise or Intense Exercise 3-4 times/week
                    </option>
                    <option value="6">
                        Very Active: Intense Exercise 6-7 times/week
                    </option>
                    <option value="7">
                        Extra Active: Very Intense Exercise Daily, or Physical Job
                    </option>
                </select>
                <br/><br/>
                <label for="gender-male">Male</label>
                <input type="radio" id="gender-male" name="gender" required/>
                <label for="gender-female">Female</label>
                <input type="radio" id="gender-female" name="gender" required/>
                <br/><br/>
                <button id="calculateTDEE">Calculate TDEE</button>
            </div>
        </section>
        `;
    }

    #createGoalOptions() {
        const containerSection = document.createElement('section');
        containerSection.classList.add("options");
        containerSection.appendChild(this.#tdeeOutput);

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
        const maleGender = this.#container.querySelector('#gender-male');
        const femaleGender = this.#container.querySelector('#gender-female');
        const activityInput = this.#container.querySelector('#activity');
        
        // Calculate TDEE
        calculateTDEE.addEventListener('click', () => this.#handleTDEECalculation(weightInput, heightInput, ageInput, maleGender, femaleGender, activityInput));

    }
    
    #handleTDEECalculation(weightInput, heightInput, ageInput, maleGender, femaleGender, activityInput){

        // Check if all fields are filled
        if (maleGender.checked === false && femaleGender.checked === false) {
            alert("Please fill out the gender info.")
            return;
        }
    
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

        const activity = activityInput.value

        // Calculate TDEE
        let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        let tdee = bmr;

        if(activity === '2') tdee *= 1.2;
        else if(activity === '3') tdee *= 1.375;
        else if(activity === '4') tdee *= 1.55;
        else if(activity === '5') tdee *= 1.725;
        else if(activity === '6' || activity === '7') tdee *= 1.99;

        this.#tdeeOutput.innerHTML = 'Your TDEE is ' + tdee;

        // scroll to options
        const options = document.getElementById("options-section");
        if(options === null) this.#container.appendChild(this.#optionsSection);
        this.#optionsSection.scrollIntoView({ behavior: "instant", block: "end" });

        // switch to options
        this.#switchToOptions();

        // Clear inputs
        this.#clearInputs(weightInput, heightInput, ageInput, maleGender, femaleGender, activityInput);
    }

    #switchToOptions() {
        // Switch to meal options
        const hub = EventHub.getInstance();

        const options = document.getElementsByClassName("goal-option");
        for(let option of options) {
            option.addEventListener('click', () => {
                hub.publish('navigateToMealPlan', null);
            });
        }
    }

    #isNumeric(str) {
        if (typeof str != "string") return false;
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    #clearInputs(weightInput, heightInput, ageInput, maleGender, femaleGender, activityInput){
        weightInput.value = '';
        heightInput.value = '';
        ageInput.value = '';
        maleGender.checked = false;
        femaleGender.checked = false;
        activityInput.value = '1';
    }
}