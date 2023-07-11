const CommentRepository = require("../repositories/comment.repository");

class CommentService {
  commentRepository = new CommentRepository();
  getComments = async (postId) => {
    const comments = await this.commentRepository.findComments(postId);
    return comments;
  };

  createComment = async (postId, userId, commenter, password, content) => {
    const comment = await this.commentRepository.createComment(
      commenter,
      password,
      content,
      postId,
      userId
    );
    return comment;
  };
}

module.exports = CommentService;
