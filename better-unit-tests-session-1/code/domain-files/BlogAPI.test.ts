import { fetchComments } from "./data-sources/Comments";
import { fetchPosts } from "./data-sources/Posts";

import { getAllPosts } from "./BlogAPI";

const MOCK_COMMENTS_FROM_API = [
  {
    id: 1,
    body: "some comment",
    postId: 1,
  },
  {
    id: 2,
    body: "some comment",
    postId: 3,
  },
];
const MOCK_POSTS_FROM_API = [
  {
    id: 1,
    title: "Post 1",
  },
  {
    id: 2,
    title: "Post 2",
  },
  {
    id: 3,
    title: "Post 3",
  },
];

jest.mock("./data-sources/Comments");
jest.mock("./data-sources/Posts");

describe("fetchPosts", () => {
  beforeAll(() => {
    (fetchComments as jest.Mock).mockReturnValue(Promise.resolve(MOCK_COMMENTS_FROM_API));
    (fetchPosts as jest.Mock).mockReturnValue(Promise.resolve(MOCK_POSTS_FROM_API));
  });
  afterAll(() => jest.resetAllMocks());

  it("should fetch all posts with comments", async () => {
    expect(await getAllPosts()).toEqual([
      {
        id: 1,
        title: "Post 1",
        comments: ["some comment"],
      },
      {
        id: 2,
        title: "Post 2",
        comments: [],
      },
      {
        id: 3,
        title: "Post 3",
        comments: ["some comment"],
      },
    ]);
  });
});