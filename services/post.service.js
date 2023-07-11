const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();

  getAllPosts = async () => {
    const allPosts = await this.postRepository.getAllPosts();
    return allPosts;
  };

  createPost = async (writer, password, title, content, userId) => {
    const post = await this.postRepository.createPost(
      writer,
      password,
      title,
      content,
      userId
    );
    return createdPost;
  };

  getPost = async (postId) => {
    const result = await this.postRepository.getPost(postId);
    if (!result) {
      return { code: 400, result: "존재하지 않는 게시글입니다." };
    } else {
      return { code: 200, result };
    }
  };
}

module.exports = PostService;
