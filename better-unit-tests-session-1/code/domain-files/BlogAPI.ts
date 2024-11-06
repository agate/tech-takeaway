import { fetchComments } from "./data-sources/Comments";
import { fetchPosts } from "./data-sources/Posts";

export type Post = {
  id: number;
  title: string;
  comments: string[];
};

export const getAllPosts = async () => {
  const posts = await fetchPosts();
  const comments = await fetchComments();
  const postsWithComments = posts.map((post) => {
    const postComments = comments
      .filter((comment) => comment.postId === post.id)
      .map((comment) => comment.body);
    return {
      ...post,
      comments: postComments,
    } as Post;
  });
  return postsWithComments;
};
