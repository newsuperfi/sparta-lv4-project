const jwt = require("jsonwebtoken");

const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  login = async (nickname, password) => {
    const user = await this.userRepository.findUser(nickname);
    if (!user) return { code: 400, message: "존재하지 않는 회원입니다." };
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

  signUp = async (nickname, email, password, confirmPassword) => {
    if (password === confirmPassword) {
      const exUser = await this.userRepository.checkExUser(nickname, email);
      if (exUser) {
        return {
          code: 400,
          message: "이미 존재하는 닉네임 혹은 이메일입니다.",
        };
      } else {
        const user = await this.userRepository.createUser(
          nickname,
          email,
          password
        );
        return { code: 201, user, message: "회원가입에 성공했습니다." };
      }
    } else {
      return { code: 400, message: "비밀번호를 확인해주세요." };
    }
  };
}

module.exports = UserService;
