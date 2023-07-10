const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();

  findAllPosts = async () => {
    const allPosts = await this.postRepository.findAllPosts();
    return allPosts;
  };
}

module.exports = PostService;
