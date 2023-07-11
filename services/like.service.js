const LikeRepository = require("../repositories/like.repository");

class LikeService {
  likeRepository = new LikeRepository();
  likePost = async (userId, postId) => {
    const { like, post } = await this.likeRepository.findPost(userId, postId);
    if (!post) {
      return { code: 400, message: "존재하지 않는 게시글입니다." };
    } else if (post) {
      if (like) {
        const result = this.likeRepository.unlikePost(userId, postId);
        return { code: 201, message: "해당 게시글의 좋아요를 취소했습니다." };
      } else {
        const result = this.likeRepository.likePost(userId, postId);
        return { code: 201, message: "해당 게시글을 좋아합니다." };
      }
    }
  };
}

module.exports = LikeService;
