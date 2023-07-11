const PostRepository = require("../repositories/post.repository");

class PostService {
  postRepository = new PostRepository();

  getAllPosts = async () => {
    const result = await this.postRepository.getAllPosts();
    return { code: 200, result };
  };

  createPost = async (writer, password, title, content, userId) => {
    const post = await this.postRepository.createPost(
      writer,
      password,
      title,
      content,
      userId
    );
    return { code: 201, result: "게시글이 작성되었습니다." };
  };

  getPost = async (postId) => {
    const result = await this.postRepository.getPost(postId);
    if (!result) {
      return { code: 400, result: "존재하지 않는 게시글입니다." };
    } else {
      return { code: 200, result };
    }
  };

  modifyPost = async (userId, postId, password, title, content) => {
    const post = await this.postRepository.getPost(postId);
    if (!post) {
      return { code: 400, result: "존재하지 않는 게시글입니다." };
    } else {
      if (post.userId !== userId) {
        return { code: 400, result: "게시글 작성자가 아닙니다." };
      } else if (post.password !== password) {
        return { code: 400, result: "비밀번호가 다릅니다." };
      } else if (!content) {
        return { code: 400, result: "내용을 입력해주세요" };
      } else {
        const result = await this.postRepository.modifyPost(
          postId,
          title,
          content
        );
        return { code: 201, result };
      }
    }
  };

  deletePost = async (userId, postId) => {
    const post = await this.postRepository.getPost(postId);
    if (!post) {
      return { code: 400, result: "존재하지 않는 게시글입니다." };
    } else {
      if (userId !== post.userId) {
        return { code: 400, result: "게시글 작성자가 아닙니다." };
      } else {
        const result = await this.postRepository.deletePost(postId);
        return { code: 200, result: "게시글 삭제가 완료되었습니다." };
      }
    }
  };
}

module.exports = PostService;
