const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  login = async (req, res) => {
    const { nickname, password } = req.body;
    const { token, code, message } = await this.userService.login(
      nickname,
      password
    );

    res.cookie("Authorization", `Bearer ${token}`);
    return res.status(code).json(message);
  };

  signUp = async (req, res) => {
    const { nickname, email, password, confirmPassword } = req.body;
    const { code, message } = await this.userService.signUp(
      nickname,
      email,
      password,
      confirmPassword
    );
    return res.status(code).json(message);
  };
}

module.exports = UserController;
