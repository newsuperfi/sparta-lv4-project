const { Users } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  findUser = async (nickname) => {
    const user = await Users.findOne({ where: { nickname } });
    return user;
  };

  checkExUser = async (nickname, email) => {
    const exUser = await Users.findOne({
      where: {
        [Op.or]: [{ nickname }, { email }],
      },
    });
    return exUser;
  };

  createUser = async ({ nickname, email, password }) => {
    const user = await Users.create({ nickname, email, password });
    return user;
  };
}

module.exports = UserRepository;
