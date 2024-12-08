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

        this.router.get("/count", async (req, res) => {
            await RecipesController.count(req, res);
        })
    }

    getRouter() {
        return this.router;
    }
}

export default new RecipesRoutes().getRouter();