const { Posts } = require("../models");

class PostRepository {
  findAllPosts = async () => {
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
}

module.exports = PostRepository;
