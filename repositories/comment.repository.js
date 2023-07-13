const { Comments } = require("../models");

class CommentRepository {
  findAllComments = async (postId) => {
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
  findComment = async (commentId) => {
    const comment = Comments.findOne({ where: { commentId } });
    return comment;
  };

  modifyComment = async (commentId, content) => {
    const modifiedComment = await Comments.update(
      { content },
      { where: { commentId } }
    );
    return modifiedComment;
  };

  deleteComment = async (commentId) => {
    await Comments.destroy({ where: { commentId } });
    return;
  };
}

module.exports = CommentRepository;
