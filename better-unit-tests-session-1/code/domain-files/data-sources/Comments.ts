import { API_BASE_URL } from "./Config";

export type CommentFromAPI = {
  id: number;
  postId: number;
  body: string;
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
