import ModelFactory from "../model/ModelFactory.js";

class RecipesController {
    constructor() {
    ModelFactory.getModel("recipes-sqlite").then((model) => {
        this.model = model;
    });
    }

    // Get all recipes
    async getAllRecipes(req, res) {
        const recipes = await this.model.read();
        res.json({ recipes });
    }

    // Clear all recipes
    async clearRecipes(req, res) {
        await this.model.delete();
        res.json(await this.model.read());
    }

    // Get the size of the database
    async count(req, res) {
        try {
            const response = await this.model.count();
            return res.status(200).json(response);
        } catch (error) {
            return res
            .status(500)
            .json({ error: "Failed to get the number of entries in Recipes table. Please try again." });
        }
    }
}

export default new RecipesController();
