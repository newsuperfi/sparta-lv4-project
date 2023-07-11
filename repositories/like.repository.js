const { Likes, Posts } = require("../models");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");

class LikeRepository {
  findPost = async (userId, postId) => {
    const post = await Posts.findOne({ where: { postId } });
    console.log("postpostpost", post);
    const like = await Likes.findOne({
      where: { [Op.and]: [{ UserId: userId }, { PostId: postId }] },
    });
    console.log("likelikelike", like);
    return { post, like };
  };

  likePost = async (userId, postId) => {
    const result = await Likes.create({ UserId: userId, PostId: postId });
    return result;
  };

  unlikePost = async (userId, postId) => {
    const result = await Likes.destroy({
      where: { [Op.and]: [{ UserId: userId }, { PostId: postId }] },
    });
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
