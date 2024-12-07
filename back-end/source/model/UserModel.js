import { Sequelize, DataTypes } from "sequelize";

// Intiliaze a new sequelize instance
const sequelize = new Sequelize({
    dialect: 'sequelize',
    storage: 'database.sqlite',
})

// Define user model
const User = sequelize.define('User', {
    userid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    update_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }

})

class _SQLiteUserModel {
    constructor () {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        if(fresh) {
            await this.delete();

            await this.create({
                username: "admin",
                password: "123456",
            })
        }
    }

    async create(user) {
        return await User.create(user);
    }

    async read(id=null) {
        if(id) {
            return await User.findByPk(id);
        }

        return await User.findAll();
    }

    async update(user) {
        const userUpdate = await User.findByPk(user.userid);
        if(!userUpdate){
            return null;
        }

        await userUpdate.update(user);
        return userUpdate
    }
}

const SQLiteUserModel = new _SQLiteUserModel();

export default SQLiteUserModel;