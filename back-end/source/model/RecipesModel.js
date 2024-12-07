import { title } from "process";
import { Sequelize, DataTypes } from "sequelize";

// Initialize a new Sequelize instance with SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

const Recipes = sequelize.define("Recipes", {
    id: { // primary key
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    recipeid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "There is no description for this recipe."
    },
    nutrients: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    serving: {
        type: DataTypes.SMALLINT,
        allowNull: true,
        defaultValue: 0,
    },
    length: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
    },
    instruction: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    },
    ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        defaultValue: null,
    },
    diet_type: {
        type: DataTypes.JSON,
        allowNull: false,
    },
});

class _RecipesModel {
    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        // An exception will be thrown if either of these operations fail.

        if (fresh) {
            await this.delete();

            await this.create({
                recipeid: 100,
                title: "Recipe 100",
                description: "Description of Recipe 100",
                nutrients: {
                    calories: 100,
                    protein: 100,
                    carb: 100,
                    sodium: 100,
                    sugar: 100,
                    fat: 100,
                },
                serving: 100,
                length: {
                    duration: 100,
                    unit: "minutes",
                },
                instruction: "Instruction 100",
                image: "Image 100",

                // This example if from spoonacular
                ingredients: [
                    "1 lb spaghetti",
                    "3.5 oz pancetta",
                    "2 Tbsps olive oil",
                    "1  egg",
                    "0.5 cup parmesan cheese"
                ],
                diet_type: {
                    vegetarian: false,
                    vegan: false,
                    glutenFree: true,
                    dairyFree: false,
                    veryHealthy: false,
                },
            });

            await this.create({
                recipeid: 101,
                title: "Recipe 101",
                description: "Description of Recipe 101",
                nutrients: {
                    calories: 100,
                    protein: 100,
                    carb: 100,
                    sodium: 100,
                    sugar: 100,
                    fat: 100,
                },
                serving: 100,
                length: {
                    duration: 100,
                    unit: "minutes",
                },
                instruction: "Instruction 101",
                image: "Image 100",

                // This example if from spoonacular
                ingredients: [
                    "1 lb spaghetti",
                    "3.5 oz pancetta",
                    "2 Tbsps olive oil",
                    "1  egg",
                    "0.5 cup parmesan cheese"
                ],
                diet_type: {
                    vegetarian: false,
                    vegan: false,
                    glutenFree: true,
                    dairyFree: false,
                    veryHealthy: false,
                },
            });

            await this.create({
                recipeid: 102,
                title: "Recipe 102",
                description: "Description of Recipe 102",
                nutrients: {
                    calories: 100,
                    protein: 100,
                    carb: 100,
                    sodium: 100,
                    sugar: 100,
                    fat: 100,
                },
                serving: 100,
                length: {
                    duration: 100,
                    unit: "minutes",
                },
                instruction: "Instruction 102",
                image: "Image 100",

                // This example if from spoonacular
                ingredients: [
                    "1 lb spaghetti",
                    "3.5 oz pancetta",
                    "2 Tbsps olive oil",
                    "1  egg",
                    "0.5 cup parmesan cheese"
                ],
                diet_type: {
                    vegetarian: false,
                    vegan: false,
                    glutenFree: true,
                    dairyFree: false,
                    veryHealthy: false,
                },
            });
        }
    }

    async create(recipe) {
        return await Recipes.create(recipe);
    }

    async read(recipeid = null) {
        if (recipeidid) {
            return await Recipes.findByPk(recipeidid);
        }

        return await Recipes.findAll();
    }

    async update(recipe) {
        const recipeu = await Recipes.findByPk(recipe.id);
        if (!recipeu) {
            return null;
        }

        await recipeu.update(recipe);
        return recipeu;
    }
}