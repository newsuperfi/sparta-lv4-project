const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  login = async (req, res) => {
    try {
      const { nickname, password } = req.body;
      const { token, code, message } = await this.userService.login(
        nickname,
        password
      );

      res.cookie("Authorization", `Bearer ${token}`);
      return res.status(code).json(message);
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };

  signUp = async (req, res) => {
    try {
      const { nickname, email, password, confirmPassword } = req.body;
      const { code, message, user } = await this.userService.signUp(
        nickname,
        email,
        password,
        confirmPassword
      );
      return res.status(code).json({ user, message });
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };
}

module.exports = UserController;
