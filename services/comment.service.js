const CommentRepository = require("../repositories/comment.repository");

class CommentService {
  commentRepository = new CommentRepository();
  getComments = async (postId) => {
    const comments = await this.commentRepository.findComments(postId);
    return comments;
  };
}

module.exports = CommentService;
