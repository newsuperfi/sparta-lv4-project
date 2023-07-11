const CommentService = require("../services/comment.service");

class CommentController {
  commentService = new CommentService();
  getComments = async (req, res) => {
    const { postId } = req.params;
    const comments = await this.commentService.getComments(postId);
    return res.status(200).json(comments);
  };

  createComment = async (req, res) => {
    const { commenter, password, content } = req.body;
    const { postId } = req.params;
    const { userId } = res.locals.user;
    if (!content) {
      return res.status(400).json({ message: "댓글 내용을 입력해주세요" });
    } else {
      const comment = await this.commentService.createComment(
        postId,
        userId,
        commenter,
        password,
        content
      );
      return res.status(201).json({ message: "댓글이 작성되었습니다." });
    }
  };

  modifyComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    const { content, password } = req.body;
    if (!content)
      return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
    const { code, modifiedComment, message } =
      await this.commentService.modifyComment(
        userId,
        content,
        commentId,
        password
      );
    if (modifiedComment) {
      return res.status(code).json(message);
    } else {
      return res.status(code).json(message);
    }
  };
}

module.exports = CommentController;
