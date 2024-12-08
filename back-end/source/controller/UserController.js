import ModelFactory from "../model/ModelFactory.js";

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
  
      // Create the new user object 
      const user = await this.model.create(req.body);
  
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

        if (!user || !(password === user.password)) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        console.log(res.json(user.dataValues));
        return res.status(200).json(user.dataValues);
      } catch (error) {
        // Log any unexpected error
        console.error("Error adding user:", error);
        return res.status(500).json({error: "Falied to login. Please try again."})
      }
  }
}

export default new UserController();
