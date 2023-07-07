const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const { Posts } = require('../models');




router.route('/')
  .get(async (req, res) => {
    const posts = await Posts.findAll({order:[['createdAt','DESC']]})
    if (posts.length) {
      const results = posts.map((post) => {
        return {
          "작성자": post.writer,
          "제목": post.title,
          "작성일시": post.createdAt,
        };
      });
      res.json({ data: results })
    } else {
      res.json({ errorMessage: "포스트가 존재하지 않습니다." })
    }
  })
  .post(auth, (req, res) => {
    try {
      const { writer, password, title, content } = req.body;
      UserId = res.locals.user.userId;
      Posts.create({ writer, password, title, content, UserId })
      res.json({ message: '게시글을 생성하였습니다.' });
    } catch (error) { console.error(error) }
  })

router.route('/:postId')
  .get(async (req, res) => {
    const postId = req.params.postId;
    // if (ObjectId.isValid(postId)) {
    const post = await Posts.findOne({ where: { postId: postId } });
    if (post) {
      const results = {
        "postId": post.postId,
        "writer": post.writer,
        "title": post.title,
        "content": post.content,
        "createdAt": post.createdAt
      }
      res.json({ data: results })
    } else {
      res.status(400).json({ errorMessage: "존재하지 않는 데이터입니다." });
    }
    // } else {
    //   res.status(400).json({ errorMessage: "데이터 형식이 올바르지 않습니다." });
    // }
  })
  .put(auth, async (req, res) => {
    const { password, writer, title, content } = req.body;
    const postId = req.params.postId;
    const { userId } = res.locals.user;

    const post = await Posts.findOne({ where: { postId: postId } });
    if (post) {
      if (password !== post.password) {
        res.status(400).json({ errorMessage: "비밀번호가 일치하지 않습니다." })
      } else if (post.UserId !== userId) {
        res.status(400).json({ errorMessage: "권한이 없습니다." })
      } else {
        await Posts.update({ writer: writer, title: title, content: content }, {
          where: {
            postId: postId
          }
        })
        res.status(200).json({ Message: "글이 수정되었습니다." })
      }
    } else {
      return res.status(400).json({ errorMessage: "글이 존재하지 않습니다." })
    };
  })
  .delete(auth, async (req, res) => {
    const { password } = req.body;
    const postId = req.params.postId;
    const post = await Posts.findOne({ where: { postId: postId } })
    const { userId } = res.locals.user;
    if (post) {
      if (post.password !== password) {
        res.status(400).json({ errorMessage: "비밀번호가 일치하지 않습니다." })
      } else if (userId !== post.UserId) {
        res.status(400).json({ errorMessage: "글 작성자가 아닙니다." })
      } else {
        await Posts.destroy({
          where: {
            postId: postId
          }
        })
        res.status(200).json({ message: "게시글이 삭제되었습니다." })
      }
    } else {
      res.status(400).json({ errorMessage: "글이 존재하지 않습니다." })
    }
  })


module.exports = router;