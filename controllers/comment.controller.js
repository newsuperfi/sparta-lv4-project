const CommentService = require("../services/comment.service");

class CommentController {
  commentService = new CommentService();
  getComments = async (req, res) => {
    const { postId } = req.params;
    const comments = await this.commentService.getComments(postId);
    return res.status(200).json(comments);
  };
}

module.exports = CommentController;
