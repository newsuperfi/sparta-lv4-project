const { Comments } = require("../models");

class CommentRepository {
  findComments = async (postId) => {
    const comments = await Comments.findAll({ where: { postId } });
    return comments;
  };
  createComment = async (commenter, password, content, postId, userId) => {
    const comment = await Comments.create({
      userId,
      postId,
      commenter,
      password,
      content,
    });
    return comment;
  };
}

module.exports = CommentRepository;
