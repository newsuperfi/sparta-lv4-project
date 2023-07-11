const CommentService = require("../services/comment.service");

class CommentController {
  commentService = new CommentService();
  getComments = async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentService.getComments(postId);
      return res.status(200).json(comments);
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };

  createComment = async (req, res) => {
    try {
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
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };

  modifyComment = async (req, res) => {
    try {
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
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { userId } = res.locals.user;
      const { password } = req.body;
      const { code, message } = await this.commentService.deleteComment(
        commentId,
        userId,
        password
      );
      return res.status(code).json(message);
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };
}

module.exports = CommentController;
