import { Sequelize, DataTypes } from "sequelize";

// Intiliaze a new sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
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
        unique: true,
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

class _UserModel {
    constructor () {}

    async init(fresh = false) {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        if(fresh) {
            // await this.delete();

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

    async findUsername(username){
        const user = await User.findOne({ where: { username } });
        return user;
    }
}

const UserModel = new _UserModel();

export default UserModel;