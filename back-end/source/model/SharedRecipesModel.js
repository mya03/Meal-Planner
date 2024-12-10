import {DataTypes} from 'sequelize';
import {SQLiteDB} from "./SQLiteDB.js";

const sequelize = SQLiteDB.getInstance();

const SharedRecipes = sequelize.define("SharedRecipes", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    sharedBy: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sharedWith: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field for tracking recipients
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true, // Optional field for additional information
    },
    sharedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

class _SharedRecipesModel {
    constructor() {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({force: fresh});

        if (fresh) {
            // Insert some test data
            await SharedRecipes.bulkCreate([
                {
                    recipeId: "1",
                    sharedBy: "Alice",
                    sharedWith: "Bob",
                    notes: "This is a test note.",
                },
                {
                    recipeId: "2",
                    sharedBy: "Charlie",
                    sharedWith: "David",
                    notes: "This is another test note.",
                },
            ]);
        }
    }

    async create(sharedRecipe) {
        return await SharedRecipes.create(sharedRecipe);
    }

    async read(id = null) {
        if (id) {
            return await SharedRecipes.findByPk(id);
        }
        return await SharedRecipes.findAll();
    }

    async update(sharedRecipe) {
        const recipeToUpdate = await SharedRecipes.findByPk(sharedRecipe.id);
        if (!recipeToUpdate) {
            return null;
        }
        await recipeToUpdate.update(sharedRecipe);
        return recipeToUpdate;
    }
    
    async delete(where){
        const recipeToDelete = await SharedRecipes.findOne({where});
        if (!recipeToDelete) {
            return null;
        }
        await SharedRecipes.destroy({where});
        return recipeToDelete;
    }
}

const SharedRecipesModel = new _SharedRecipesModel();

export default SharedRecipesModel;