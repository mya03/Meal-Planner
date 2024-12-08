import express from "express";
import UserController from "../controller/UserController.js";

class UserRoutes {
    constructor(){
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // DESCRIPTION
        //   Get all users. This endpoint returns an object with a 'users' property
        //   containing an array of users.
        this.router.get("/users", async (req, res) => {
            await UserController.getAllUsers(req, res);
        });

        // DESCRIPTION
        //   Add a new user. This endpoint creates a new uer with the provided
        //   data and returns the created user.
        this.router.post("/user", async (req, res)=> {
            await UserController.addUser(req, res);
        });
          
    }

    getRouter() {
        return this.router;
    }
}

export default new UserRoutes().getRouter();

