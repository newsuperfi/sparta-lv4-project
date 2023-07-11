const PostService = require("../services/post.service");

class PostController {
  postService = new PostService();

  getAllPosts = async (req, res) => {
    const posts = await this.postService.getAllPosts();

    res.status(200).json(posts);
  };

  createPost = async (req, res) => {
    const { writer, password, title, content } = req.body;
    const { userId } = res.locals.user;

    const post = await this.postService.createPost(
      writer,
      password,
      title,
      content,
      userId
    );
    res.status(201).json({ message: "게시글 작성에 성공하였습니다." });
  };

  getPost = async (req, res) => {
    const { postId } = req.params;
    const { code, result } = await this.postService.getPost(postId);
    return res.status(code).json(result);
  };
}

module.exports = PostController;
