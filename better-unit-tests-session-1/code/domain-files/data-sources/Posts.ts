import { API_BASE_URL } from "./Config";

export type PostFromAPI = {
  id: number;
  title: string;
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
