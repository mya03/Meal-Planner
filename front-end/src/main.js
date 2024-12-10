import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
import { RecipesRepositoryService } from "./services/RecipesRepositoryService.js";

// Services
const taskRepository = new RecipesRepositoryService();

// Create an instance of AppControllerComponent
const appController = new AppControllerComponent();

// Render the component in the #app container
const appContainer = document.getElementById('app');
appContainer.appendChild(appController.render());/* main.js */


