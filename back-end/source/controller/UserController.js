import ModelFactory from "../model/ModelFactory.js";
import bcrypt from "bcryptjs";

class UserController {
  constructor() {
    ModelFactory.getModel().then((model) => {
      this.model = model;
    });
  }

  // Get all users
  async getAllUsers(req, res) {
    const users = await this.model.read();
    res.json({ users })
  }

  // Add a new user
  async addUser (req, res) {
    try {
      // Check if username and password are provided
      if(!req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({error: "Username and password are required."})
      }

      const existsUser = await this.existsUser(req.body.username);
      
      if(existsUser){
        return res.status(400).json({error: "Username already exists."})
      }
      const hashPass = await bcrypt.hash(req.body.password, 10);
      const body = {username: req.body.username, password: hashPass};
      // Create the new user object 
      const user = await this.model.create(body);
  
      return res.status(200).json(user);
    } catch (error) {
      // Log any unexpected error
      console.error("Error adding user:", error);
      return res.status(500).json({error: "Falied to add user. Please try again."})
    }
  }

  //log in 
  async login (req, res){
    try {
        console.log("received request")
        const { username, password } = req.body;
        console.log("Username: " + username);
        // Check if username and password are provided
        if(!req.body || !req.body.username || !req.body.password) {
          return res.status(400).json({error: "Username and password are required."})
        }
    
        // find user
        const user = await this.model.findUsername(username);
        console.log(await bcrypt.compare(password, user.password));

        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.log("hii");
            return res.status(401).json({error: "Invalid credentials"});
        }
        return res.status(200).json(user);
      } catch (error) {
        // Log any unexpected error
        console.error("Error adding user:", error);
        return res.status(500).json({error: "Falied to login. Please try again."})
      }
  }

  async existsUser(username){
    const user = await this.model.findUsername(username);
    return user;
  }
}

export default new UserController();
