import { AppControllerComponent } from "./components/AppControllerComponent/AppControllerComponent.js";
import { RecipesRepositoryService } from "./services/RecipesRepositoryService.js";

// Create an instance of AppControllerComponent
const appController = new AppControllerComponent();

// Render the component in the #app container
const appContainer = document.getElementById('app');
appContainer.appendChild(appController.render());

// Services
const taskRepository = new RecipesRepositoryService();

