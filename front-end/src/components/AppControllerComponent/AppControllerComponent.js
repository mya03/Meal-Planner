import { detailedRecipeComponent } from "../detailedRecipeComponent/detailedRecipeComponent.js";
import { HomeComponent } from "../HomeComponent/HomeComponent.js";
import { NavigationBarComponent } from "../NavigationBarComponent/NavigationBarComponent.js";
import { GoalOrientedMealPlanning } from "../GoalOrientedMealPlanning/GoalOrientedMealPlanning.js";
import { MealPlan } from "../MealPlan/MealPlan.js";
import { IngredientBasedSuggestionComponent } from "../IngredientBasedSuggestionComponent/IngredientBasedSuggestionComponent.js"
import { ProfileComponent } from "../ProfileComponent/ProfileComponent.js";
import { EventHub } from '../../eventhub/EventHub.js';

export class AppControllerComponent{
    #container = null; // Private container for the component
    #currentView = 'home'; // Track the current view
    #detailedRecipeComponent = null; // Instance of the detailed recipe component
    #HomeComponent = null; // Instance of the Home component
    #NavigationBarComponent = null; // Instance of the Naigation Bar Component
    #GoalOrientedMealPlanning = null;
    #MealPlan = null;
    #IngredientBasedSuggestionComponent = null;
    #ProfileComponent = null;
    #hub = null; // EventHub instance for managing events

    constructor(){
        this.#hub = EventHub.getInstance();
        this.#HomeComponent = new HomeComponent();
        this.initializePages();
    }

    initializePages() {
        this.#detailedRecipeComponent = new detailedRecipeComponent();
        this.#NavigationBarComponent = new NavigationBarComponent();
        this.#GoalOrientedMealPlanning = new GoalOrientedMealPlanning();
        this.#MealPlan = new MealPlan();
        this.#IngredientBasedSuggestionComponent = new IngredientBasedSuggestionComponent();
        this.#ProfileComponent = new ProfileComponent();
    }

    // Render the AppController component and return the container
    render(){
        this.#createContainer();
        this.#setupContainerContent();
        this.#attachEventListener();
        this.#detailedRecipeComponent.render();
        this.#HomeComponent.render();
        this.#NavigationBarComponent.render();
        this.#GoalOrientedMealPlanning.render();
        this.#MealPlan.render();
        this.#IngredientBasedSuggestionComponent.render();
        this.#ProfileComponent.render();

        // Rendering the navigation bar
        this.#renderNavigationBar();
        //Initialize the landing view
        this.#renderCurrentView();
        return this.#container;
    }

    // Creates the main container element
    #createContainer() {
        this.#container = document.createElement('div');
        this.#container.classList.add('app-controller');
    }

    // Sets up the HTML structure for the container
    #setupContainerContent() {
        this.#container.innerHTML = `
        <div id="navigationContainer"></div>
        <div id="viewContainer"></div>
        `;
    }

    // Attaches the necessary event listeners
    #attachEventListener() {
        // Subscribe to events from the EventHub to manage switching
        this.#hub.subscribe('navigateToDetailedRecipe', () => {
            this.#currentView = 'detailedRecipe';
            this.#renderCurrentView();
        });

        this.#hub.subscribe('navigateToHome', () => {
            this.#currentView = 'home';
            this.#renderCurrentView();
        });

        this.#hub.subscribe('navigateToGoal', () => {
            this.#currentView = 'goalPlan';
            this.#renderCurrentView();
        });

        this.#hub.subscribe('navigateToMealPlan', () => {
            this.#currentView = 'mealPlan';
            this.#renderCurrentView();
        });

        this.#hub.subscribe('navigateToProfile', () => {
            this.#currentView = 'profile';
            this.#renderCurrentView();
        });

        this.#hub.subscribe('navigateToRecipes', () => {
            this.#currentView = 'recipes';
            this.#renderCurrentView();
        });
        


        
    }

    // Renders the navigation bar
    #renderNavigationBar(){
        const navigationContainer = this.#container.querySelector('#navigationContainer');
        navigationContainer.appendChild(this.#NavigationBarComponent.render());
    }

    // Renders the current view based on the #currentView state
    #renderCurrentView() {
        const viewContainer = this.#container.querySelector('#viewContainer');
        viewContainer.innerHTML = ''; // Clear existing content

        if (this.#currentView === 'home'){
            //render home page
            this.initializePages();
            viewContainer.appendChild(this.#HomeComponent.render());
        } else if (this.#currentView === 'detailedRecipe') {
            //render detailed recipe page 
            viewContainer.appendChild(this.#detailedRecipeComponent.render());      
        } else if (this.#currentView === 'goalPlan') {
            //render detailed recipe page 
            viewContainer.appendChild(this.#GoalOrientedMealPlanning.render());    
        } else if (this.#currentView === 'mealPlan') {
            //render detailed recipe page 
            viewContainer.appendChild(this.#MealPlan.render());    
        } else if (this.#currentView === 'profile') {
            //render detailed recipe page 
            viewContainer.appendChild(this.#ProfileComponent.render());    
        } else if (this.#currentView === 'recipes') {
            //render detailed recipe page 
            viewContainer.appendChild(this.#IngredientBasedSuggestionComponent.render());    
        }
    }
}
