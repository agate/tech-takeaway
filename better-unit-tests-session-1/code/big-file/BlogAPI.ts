const API_BASE_URL = "https://my-json-server.typicode.com/typicode/demo";

export type PostFromAPI = {
  id: number;
  title: string;
};

export type CommentFromAPI = {
  id: number;
  postId: number;
  body: string;
};

export type Post = {
  id: number;
  title: string;
  comments: string[];
};

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    const data = (await response.json()) as PostFromAPI[];
    return data;
  } catch (error) {
    console.error("Error fetching posts:", JSON.stringify(error));
    return [];
  }
};

export const fetchComments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`);
    const data = (await response.json()) as CommentFromAPI[];
    return data;
  } catch (error) {
    console.error("Error fetching comments:", JSON.stringify(error));
    return [];
  }
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
