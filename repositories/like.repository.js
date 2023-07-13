const { Likes, Posts } = require("../models");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class LikeRepository {
  findPost = async (userId, postId) => {
    const post = await Posts.findOne({ where: { postId } });
    const like = await Likes.findOne({
      where: { [Op.and]: [{ UserId: userId }, { PostId: postId }] },
    });
    return { post, like };
  };

  likePost = async (userId, postId) => {
    await Likes.create({ UserId: userId, PostId: postId });
    return;
  };

  unlikePost = async (userId, postId) => {
    await Likes.destroy({
      where: { [Op.and]: [{ UserId: userId }, { PostId: postId }] },
    });
    return;
  };

  findLikedPost = async (userId) => {
    const results = await Posts.findAll({
      include: {
        model: Likes,
        where: { UserId: userId },
        attributes: [],
        required: true,
      },
      attributes: [
        "postId",
        "writer",
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM Likes WHERE Likes.PostId = Posts.postId)`
          ),
          "likes",
        ],
      ],
      order: [[Sequelize.literal("likes"), "DESC"]],
    });
    return results;
  };
}

module.exports = LikeRepository;
