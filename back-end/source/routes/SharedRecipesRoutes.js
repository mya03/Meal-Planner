import express from "express";
import SharedRecipesController from "../controllers/SharedRecipesController.js";

class SharedRecipeRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Get all shared recipes
        this.router.get("/", async (req, res) => {
            await SharedRecipesController.getAllSharedRecipes(req, res);
        });

        // Share a new recipe
        this.router.post("/", async (req, res) => {
            await SharedRecipesController.shareRecipe(req, res);
        });

        // Get a shared recipe by ID
        this.router.get("/:id", async (req, res) => {
            await SharedRecipesController.getSharedRecipeById(req, res);
        });

        // Update a shared recipe
        this.router.put("/:id", async (req, res) => {
            await SharedRecipesController.updateSharedRecipe(req, res);
        });

        // Delete a shared recipe
        this.router.delete("/:id", async (req, res) => {
            await SharedRecipesController.deleteSharedRecipe(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new SharedRecipeRoutes().getRouter();