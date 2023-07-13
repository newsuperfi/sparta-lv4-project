const LikeRepository = require("../repositories/like.repository");

class LikeService {
  likeRepository = new LikeRepository();
  likePost = async (userId, postId) => {
    const { like, post } = await this.likeRepository.findPost(userId, postId);
    if (!post) {
      return { code: 404, message: "존재하지 않는 게시글입니다." };
    } else {
      if (like) {
        await this.likeRepository.unlikePost(userId, postId);
        return { code: 201, message: "해당 게시글의 좋아요를 취소했습니다." };
      } else {
        await this.likeRepository.likePost(userId, postId);
        return { code: 201, message: "해당 게시글을 좋아합니다." };
      }
    }
  };

  findLikedPost = async (userId) => {
    const results = await this.likeRepository.findLikedPost(userId);
    if (!results.length) {
      return { code: 200, results: "좋아요 한 게시글이 없습니다." };
    } else {
      return { code: 200, results };
    }
  };
}

module.exports = LikeService;
