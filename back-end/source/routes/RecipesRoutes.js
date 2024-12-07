import express from "express";
import RecipesController from "../controller/RecipesController.js";

class RecipesRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/recipes", async (req, res) => {
            await RecipesController.getAllTasks(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new RecipesRoutes().getRouter();