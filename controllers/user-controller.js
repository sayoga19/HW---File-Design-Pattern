const UserRepository = require("../repositories/user-repository");

class UserController {
  static async register(req, res, next) {
    try {
      const { id, email, gender, password, role } = req.body;
      const newUser = await UserRepository.register(id, email, gender, password, role);
      res.status(201).json({ status: "success", message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await UserRepository.login(email, password);
      res.status(200).json({ status: "success", message: "Logged in successfully" , token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
