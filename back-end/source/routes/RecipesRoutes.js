import express from "express";
import RecipesController from "../controller/RecipesController.js";

class RecipesRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {

        // DESCRIPTION
        //   Get a random recipe. This request returns a random recipe
        // REQUEST
        //   POST /recipes
        //   There need to be numRecipe field in the body (number of random recipes)
        // RESPONSE
        //   {
        //     an array of Recipe objects
        //   }
        // STATUS CODES
        //   200 - OK: The request was successful
        //   400 - Bad Request: Missing body or numRecipe
        //   500 - Internal Server Error: The server encountered an error
        this.router.post("/random", async (req, res) => {
            await RecipesController.getRandomRecipe(req, res);
        });

        // DESCRIPTION
        //   Get all recipes
        // REQUEST
        //   GET /recipes
        // RESPONSE
        //   {
        //     an array of Recipe objects
        //   }
        // STATUS CODES
        //   200 - OK: The request was successful
        //   500 - Internal Server Error: The server encountered an error
        this.router.get("/recipes", async (req, res) => {
            await RecipesController.getAllRecipes(req, res);
        });

        // delete all recipes
        this.router.delete("/recipes", async (req, res) => {
            await RecipesController.clearRecipes(req, res);
        });

        // DESCRIPTION
        //   Get all recipes after applying the filter by ingredients
        // REQUEST
        //   POST /recipes
        //   There need to be ingredients field in the body (ingredients to filter by)
        // RESPONSE
        //   {
        //     an array of Recipe objects
        //   }
        // STATUS CODES
        //   200 - OK: The request was successful
        //   400 - Bad Request: Missing body or ingredients
        //   500 - Internal Server Error: The server encountered an error
        this.router.post("/ingredients", async (req, res) => {
            await RecipesController.filterIngredients(req, res);
        });

        // DESCRIPTION
        //   Get all recipes after applying the filter by diet type
        // REQUEST
        //   POST /recipes
        //   There need to be diet field in the body (diet types to filter by)
        // RESPONSE
        //   {
        //     an array of Recipe objects
        //   }
        // STATUS CODES
        //   200 - OK: The request was successful
        //   400 - Bad Request: Missing body or diet
        //   500 - Internal Server Error: The server encountered an error
        this.router.post("/diet", async (req, res) => {
            await RecipesController.filterRecipesBasedOnDiet(req, res);
        })

        // DESCRIPTION
        //   Get all recipes after within the calories range
        // REQUEST
        //   POST /recipes
        //   There need to be 2 fields in the body, numRecipes (how many to return)
        //   and the average calories
        // RESPONSE
        //   {
        //     an array of Recipe objects
        //   }
        // STATUS CODES
        //   200 - OK: The request was successful
        //   400 - Bad Request: Missing body or calories or numRecipes
        //   500 - Internal Server Error: The server encountered an error
        this.router.post("/calories", async (req, res) => {
            await RecipesController.getRecipesBasedOnCalories(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new RecipesRoutes().getRouter();