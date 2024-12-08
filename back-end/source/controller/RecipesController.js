import ModelFactory from "../model/ModelFactory.js";

class RecipesController {
    constructor() {
    ModelFactory.getModel("Recipes").then((model) => {
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

    // get recipes based on calories
    async getRecipesBasedOnCalories(req, res) {
        try {
            if (!req.body || !req.body.calories || !req.body.numRecipes) {
                return res.status(400).json({ error: "NumRecipes and Calories are required." });
            }

            const result = await this.model.getRecipeBasedOnCalories(req.body.numRecipes, req.body.calories);

            return res.status(201).json(result);
        } catch (error) {
            return res
            .status(500)
            .json({ error: "Failed to get recipes based on calories. Please try again." });
        }
    }
}

export default new RecipesController();
