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
        //   GET /recipes
        // RESPONSE
        //   {
        //     "recipes": {...}
        //   }
        // STATUS CODES
        //   200 - OK: The request was successful
        //   500 - Internal Server Error: The server encountered an error
        this.router.post("/random", async (req, res) => {
            await RecipesController.getRandomRecipe(req, res);
        });

        this.router.delete("/recipes", async (req, res) => {
            await RecipesController.clearRecipes(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new RecipesRoutes().getRouter();