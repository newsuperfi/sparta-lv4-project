const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  login = async (req, res) => {
    const { nickname, password } = req.body;
    const { code, data, token } = await this.userService.login(
      res,
      nickname,
      password
    );

    res.cookie("Authorization", `Bearer ${token}`);
    return res.status(code).json(data);
  };

  checkExUser = async (req, res) => {
    const { nickname, email, password, confirmPassword } = req.body;
  };

  signUp = async (req, res) => {
    const { nickname, email, password, confirmPassword } = req.body;
    const {} = await this.userService.signUp(
      nickname,
      email,
      password,
      confirmPassword
    );
  };
}

module.exports = UserController;
