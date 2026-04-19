const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")


class AuthController {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body;

      if (!username || !email || !password) {
        const missing = [];
        if (!username) missing.push("Username is required");
        if (!email) missing.push("Email is required");
        if (!password) missing.push("Password is required");

        return next({
          name: "BadRequest",
          message: missing.join(", "),
        });
      }

      const existing = await User.findOne({ where: { email } });
      if (existing) {
        return next({
          name: "BadRequest",
          message: "Email has been used",
        });
      }

      const newUser = await User.create({
        username,
        email,
        password,
        role: "staff",
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (err) {
      next(err);
        }
    }
    
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

      if (!email) {
        return next({
          name: "BadRequest",
          message: "Email is required",
        });
      }

      if (!password) {
        return next({
          name: "BadRequest",
          message: "Password is required",
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user || !comparePassword(password, user.password)) {
        return next({ name: "InvalidLogin" });
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const access_token = signToken(payload);

      res.status(200).json({
        access_token,
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      });

    } catch (err) {
      next(err);
        }
    }
}

module.exports = AuthController