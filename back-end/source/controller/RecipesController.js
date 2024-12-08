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

    // filter ingrdients
    async filterIngredients(req, res) {
        try {
            // Check if 'ingredients' is provided in the request body
            if (!req.body || !req.body.ingredients) {
                return res.status(400).json({ error: "Ingredients are required." });
            }
        
            const recipes = await this.model.filterIngredients(req.body.ingredients);
        
            return res.status(201).json(recipes);
        } catch (error) {
        // Log any unexpected errors and send a server error response
        console.error("Error filtering ingredients:", error);
        return res
            .status(500)
            .json({ error: "Failed to filter by ingredient. Please try again." });
        }
    }

    // filter diet
    async filterRecipesBasedOnDiet(req, res) {
        try {
            // Check if 'diet-type' is provided in the request body
            if (!req.body || !req.body.diet) {
                return res.status(400).json({ error: "Diet type is required." });
            }
        
            // Get the recipes with the diet type
            const recipes = await this.model.filterDiet(req.body.diet);
        
            // Send back the created task as the response
            return res.status(201).json(recipes);
        } catch (error) {
        // Log any unexpected errors and send a server error response
        console.error("Error filtering recipes:", error);
        return res
            .status(500)
            .json({ error: "Failed to filter recipe. Please try again." });
        }
    }
}

export default new RecipesController();
