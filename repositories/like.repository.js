const { Likes, Posts } = require("../models");
const { Op } = require("sequelize");

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
}

module.exports = LikeRepository;
