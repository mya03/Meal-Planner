import express from "express";
import RecipesController from "../controller/RecipesController.js";

class RecipesRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/recipes", async (req, res) => {
            await RecipesController.getAllRecipes(req, res);
        });

        this.router.delete("/recipes", async (req, res) => {
            await RecipesController.clearRecipes(req, res);
        });

        this.router.post("/diet", async (req, res) => {
            await RecipesController.filterRecipes(req, res);
        })
    }

    getRouter() {
        return this.router;
    }
}

export default new RecipesRoutes().getRouter();