const express = require("express");
const router = express.Router();
const { Likes, Posts, Users } = require("../models");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");
const auth = require("../middlewares/auth");
const LikeController = require("../controllers/like.controller");
const likeController = new LikeController();

router.get("/:postId", auth, likeController.likePost);

// 좋아요 한 게시글 전체 조회
router.get("/", auth, async (req, res) => {
  const { userId } = res.locals.user;

  // 시도 (1) 1.로그인한 userId 가 좋아요 한 postId 조회
  // -> 2.postId에 해당하는 게시글 정보 조회 -> 3.해당 게시글에 좋아요 한 userId 조회
  // 3에서 좋아요 한 userId들을 불러오는데 까지는 되지만, COUNT 할 수가 없음

  // const likeList = await Likes.findAll({
  //   where: { UserId: userId },
  //   attributes: [],
  //   include: [
  //     {
  //       model: Posts,
  //       attributes: ["writer", "title", "createdAt"],
  //       include: [
  //         {
  //           model: Likes,
  //           attributes: ["UserId"],
  //         },
  //       ],
  //     },
  //   ],
  // });

  // 시도(2) 1.로그인한 userId가 좋아요 한 postId에 해당하는 게시글 조회
  //-> 해당 postId에 좋아요 한 전체 userId 갯수를 조회하려 했으나 로그인한 userId것만 조회됨 (다른userId의 좋아요는 반영되지 않음)
  // const likeList = await Posts.findAll({
  //   include: [{ model: Likes, where: { UserId: userId }, attributes: [] }],
  //   attributes: [
  //     "postId",
  //     [Sequelize.fn("COUNT", Sequelize.col("likes.id")), "likesCount"],
  //   ],
  //   group: ["posts.postId"],
  // });

  // 시도(3) 내가 좋아요하지 않은 게시물까지 조회되어버림.
  // const likeList = await Posts.findAll({
  //   include: [{ model: Likes, attributes: [] }],
  //   attributes: [
  //     "postId",
  //     [Sequelize.fn("COUNT", Sequelize.col("likes.id")), "likesCount"],
  //   ],
  //   group: ["posts.postId"],
  // });

  // 로우쿼리 안쓰고 조회할 수 있는 법은 없을까요?
  const likeList = await Posts.findAll({
    include: [
      {
        model: Likes,
        where: { UserId: userId },
        attributes: [],
        required: true,
      },
    ],
    attributes: [
      "postId",
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM Likes WHERE Likes.PostId = Posts.postId)`
        ),
        "likes",
      ],
    ],
    order: [[Sequelize.literal(`likes`), "DESC"]],
    // group: ["posts.postId"],
  });

  res.status(200).json(likeList);
});

// 게시글 좋아요 / 취소
router.get("/:postId", auth, async (req, res) => {
  const { userId } = res.locals.user;
  const { postId } = req.params;
  try {
    const exLike = await Likes.findOne({
      where: { UserId: userId, PostId: postId },
    });
    console.log("exlike", exLike);
    if (!exLike) {
      await Likes.create({ UserId: userId, PostId: postId });
      return res.status(201).json({ message: "이 글을 좋아합니다." });
    } else {
      await Likes.destroy({
        where: { [Op.and]: [{ UserId: userId }, { PostId: postId }] },
      });
      return res.status(201).json({ message: "좋아요가 취소되었습니다." });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
