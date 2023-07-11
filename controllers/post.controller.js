const PostService = require("../services/post.service");

class PostController {
  postService = new PostService();

  getAllPosts = async (req, res) => {
    try {
      const { code, result } = await this.postService.getAllPosts();

      res.status(code).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };

  createPost = async (req, res) => {
    try {
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
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };

  getPost = async (req, res) => {
    try {
      const { postId } = req.params;
      const { code, result } = await this.postService.getPost(postId);
      return res.status(code).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };

  modifyPost = async (req, res) => {
    try {
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
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };

  deletePost = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { code, result } = await this.postService.deletePost(
        userId,
        postId
      );
      return res.status(code).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("알 수 없는 에러가 발생했습니다.");
    }
  };
}

module.exports = PostController;
