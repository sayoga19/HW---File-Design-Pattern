const { users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

class UserRepository {
  static async register(id, email, gender, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await users.create({
      id,
      email,
      gender,
      password: hashedPassword,
      role,
    });
  }

  static async login(email, password) {
    const user = await users.findOne({ where: { email } });
    if (!user) {
      throw { name: "InvalidCredential" };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw { name: "InvalidCredential" };
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        gender: user.gender,
        password: user.password,
        role: user.role,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    return token;
  }
}

module.exports = UserRepository;