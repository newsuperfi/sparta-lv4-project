const PostService = require("../services/post.service");

class PostController {
  postService = new PostService();

  getAllPosts = async (req, res) => {
    const { code, result } = await this.postService.getAllPosts();

    res.status(code).json(result);
  };

  createPost = async (req, res) => {
    const { writer, password, title, content } = req.body;
    const { userId } = res.locals.user;

    const { code, result } = await this.postService.createPost(
      writer,
      password,
      title,
      content,
      userId
    );
    res.status(code).json({ result });
  };

  getPost = async (req, res) => {
    const { postId } = req.params;
    const { code, result } = await this.postService.getPost(postId);
    return res.status(code).json(result);
  };

  modifyPost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content, password } = req.body;
    const { code, result } = await this.postService.modifyPost(
      userId,
      postId,
      password,
      title,
      content
    );
    return res.status(code).json(result);
  };

  deletePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { code, result } = await this.postService.deletePost(userId, postId);
    return res.status(code).json(result);
  };
}

module.exports = PostController;
