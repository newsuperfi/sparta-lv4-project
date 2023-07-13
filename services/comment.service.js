const CommentRepository = require("../repositories/comment.repository");

class CommentService {
  commentRepository = new CommentRepository();
  getComments = async (postId) => {
    const comments = await this.commentRepository.findAllComments(postId);
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

  modifyComment = async (userId, content, commentId, password) => {
    const comment = await this.commentRepository.findComment(commentId);
    if (!comment) {
      return { code: 404, message: "존재하지 않는 댓글입니다." };
    } else {
      if (userId !== comment.userId) {
        return { code: 403, message: "댓글 작성자가 아닙니다." };
      } else if (comment.password !== password) {
        return { code: 400, message: "비밀번호를 확인해주세요." };
      } else {
        const modifiedComment = await this.commentRepository.modifyComment(
          commentId,
          content
        );
        return {
          modifiedComment,
          code: 201,
          message: "댓글이 정상적으로 수정되었습니다.",
        };
      }
    }
  };

  deleteComment = async (commentId, userId, password) => {
    const findComment = await this.commentRepository.findComment(commentId);
    if (!findComment)
      return { code: 404, message: "존재하지 않는 댓글입니다." };
    if (findComment.userId !== userId) {
      return { code: 403, message: "댓글 작성자가 아닙니다." };
    } else if (findComment.password !== password) {
      return { code: 400, message: "비밀번호를 확인해주세요." };
    } else {
      await this.commentRepository.deleteComment(commentId);
      return { code: 201, message: "댓글이 삭제되었습니다." };
    }
  };
}

module.exports = CommentService;
