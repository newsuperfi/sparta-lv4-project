const { Posts } = require("../models");

class PostRepository {
  findAllPosts = async () => {
    const posts = await Posts.findAll({
      attributes: ["writer", "title", "createdAt"],
      order: [["createdAt", "DESC"]],
    });
    return posts;
  };
}

module.exports = PostRepository;
