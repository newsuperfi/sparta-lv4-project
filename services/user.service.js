const jwt = require("jsonwebtoken");

const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  login = async (nickname, password) => {
    const user = await this.userRepository.findUser(nickname);
    console.log(user);
    if (password !== user.password) {
      return { code: 400, message: "비밀번호를 확인해주세요." };
    } else {
      const token = jwt.sign(
        {
          userId: user.userId,
        },
        "customized-secret-key"
      );

      return { token, code: 200, message: "로그인에 성공했습니다." };
    }
  };

  checkExUser = async (nickname, email, password, confirmPassword) => {
    if (password === confirmPassword) {
      const exUser = await this.userRepository.checkExUser(
        nickname,
        email,
        password
      );
      return exUser;
    }
  };

  signUp = async (nickname, email, password, confirmPassword) => {
    if (password === confirmPassword) {
      const { user } = await this.userRepository.createUser(
        nickname,
        email,
        password
      );
      return user;
    } else {
    }
  };
}

module.exports = UserService;
