const { Comments } = require("../models");

class CommentRepository {
  findComments = async (postId) => {
    const comments = await Comments.findAll({ where: { postId } });
    return comments;
  };
}

module.exports = CommentRepository;
