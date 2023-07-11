const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();

  findAllPosts = async () => {
    const allPosts = await this.postRepository.findAllPosts();
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
}

module.exports = PostService;
