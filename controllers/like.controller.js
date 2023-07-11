const LikeService = require("../services/like.service");

class LikeController {
  likeService = new LikeService();
  likePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { code, message } = await this.likeService.likePost(userId, postId);
    return res.status(code).json(message);
  };

  findLikedPost = async (req, res) => {
    const { userId } = res.locals.user;
    const { code, results } = await this.likeService.findLikedPost(userId);
    return res.status(code).json(results);
  };
}

module.exports = LikeController;
