const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const auth = require("../middlewares/auth");
const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

router.get("/:postId", commentController.getComments);
router.post("/:postId", auth, commentController.createComment);
router.put("/:commentId", auth, commentController.modifyComment);
router.delete("/:commentId", auth, commentController.deleteComment);

// router.route("/:postId");
// .get(auth, async (req, res) => {
//   const postId = req.params.postId;

//   const comments = await Comments.findAll({
//     where: { postId: postId },
//     order: [["createdAt", "DESC"]],
//   });
//   if (comments.length) {
//     const data = comments.map((comments) => {
//       return {
//         commentId: comments.commentId,
//         commenter: comments.commenter,
//         content: comments.content,
//         createdAt: comments.createdAt,
//         postId: comments.PostId,
//       };
//     });
//     res.json({ data: data });
//   } else {
//     res.json({ message: "댓글이 없습니다." });
//   }
// })
// .post(auth, (req, res) => {
//   const { postId } = req.params;
//   const { commenter, password, content } = req.body;
//   const { userId } = res.locals.user;
//   if (!content) {
//     res.json({ errorMessage: "댓글 내용을 입력해주세요." });
//   } else {
//     Comments.create({ postId, commenter, userId, password, content });
//     res.json({ message: "댓글이 작성되었습니다." });
//   }
// });

// router.route("/:commentId");
// .delete(auth, async (req, res) => {
//   const commentId = req.params.commentId;
//   const password = req.body.password;
//   const { userId } = res.locals.user;

//   const comment = await Comments.findOne({ where: { commentId } });
//   if (comment) {
//     if (userId !== comment.UserId)
//       return res.status(400).json({ errorMessage: "권한이 없습니다." });
//     else if (comment.password === password) {
//       await Comments.destroy({
//         where: {
//           commentId: commentId,
//         },
//       });
//       res.json({ message: "댓글이 삭제되었습니다." });
//     } else {
//       res.status(404).json({ errorMessage: "비밀번호가 다릅니다." });
//     }
//   } else {
//     res.status(400).json({ errorMessage: "존재하지 않는 댓글입니다." });
//   }
// });

module.exports = router;
