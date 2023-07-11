const { Posts } = require("../models");

class PostRepository {
  getAllPosts = async () => {
    const posts = await Posts.findAll({
      attributes: ["writer", "title", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    return posts;
  };

  createPost = async (writer, password, title, content, userId) => {
    const post = await Posts.create({
      writer,
      password,
      title,
      content,
      userId,
    });
    return post;
  };

  getPost = async (postId) => {
    const post = await Posts.findOne({
      where: { postId },
    });
    return post;
  };

  modifyPost = async (postId, title, content) => {
    const result = await Posts.update(
      { title, content },
      { where: { postId } }
    );
    console.log("repository result", result);
    return result;
  };

  deletePost = async (postId) => {
    const result = await Posts.destroy({ where: { postId } });
    return result;
  };
}

module.exports = PostRepository;
