import ModelFactory from "../model/ModelFactory.js";

class RecipesController {
    constructor() {
    ModelFactory.getModel("Recipes").then((model) => {
        this.model = model;
    });
    }

    // Get all recipes
    async getAllRecipes(req, res) {
        try {
            const recipes = await this.model.read();
            return res.status(200).json({ recipes });
        } catch (error) {
            return res.status(500).json(`${error}`);
        }
    }

    // Clear all recipes
    async clearRecipes(req, res) {
        await this.model.delete();
        res.json(await this.model.read());
    }

    // Get a random recipe in the database
    async getRandomRecipe(req, res) {
        try {
            console.log(req.body);
            if (!req.body || !req.body.numRecipe) {
                return res.status(400).json({ error: "NumRecipe is required." });
            }
        
            const ids = new Set();
            while(ids.size < req.body.numRecipe) {
                ids.add(await this.model.getRandom());
            }

            const recipes = [];
            for(const id of ids) {
                recipes.push(await this.model.read(id));
            }
            return res.status(200).json(recipes);
        } catch (error) {
            return res.status(500).json(`${error}`);
        }
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
