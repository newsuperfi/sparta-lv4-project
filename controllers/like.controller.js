const LikeService = require("../services/like.service");

class LikeController {
  likeService = new LikeService();
  likePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { code, message } = await this.likeService.likePost(userId, postId);
      return res.status(code).json(message);
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };

  findLikedPost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { code, results } = await this.likeService.findLikedPost(userId);
      return res.status(code).json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };
}

module.exports = LikeController;
