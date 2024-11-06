import { fetchPosts, fetchComments, getAllPosts } from "./BlogAPI";

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

describe("BlogAPI", () => {
  describe("fetchComments", () => {
    afterAll(() => jest.restoreAllMocks());

    it("should fetch comments", async () => {
      const fetchMock = jest.spyOn(global, "fetch");
      jest.spyOn(global.console, "error").mockImplementation();
      fetchMock.mockReturnValueOnce(
        Promise.resolve(new Response(JSON.stringify(MOCK_COMMENTS_FROM_API))),
      )
      expect(await fetchComments()).toEqual(MOCK_COMMENTS_FROM_API);
      expect(console.error).toHaveBeenCalledTimes(0);
      fetchMock.mockReturnValueOnce(
        Promise.resolve(new Response(null, { status: 500, statusText: "this is error message" })),
      );
      expect(await fetchComments()).toEqual([]);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe("fetchPosts", () => {
    afterAll(() => jest.restoreAllMocks());

    it("should fetch posts", async () => {
      const fetchMock = jest.spyOn(global, "fetch");
      jest.spyOn(global.console, "error").mockImplementation();
      fetchMock.mockReturnValueOnce(
        Promise.resolve(new Response(JSON.stringify(MOCK_POSTS_FROM_API))),
      );
      expect(await fetchPosts()).toEqual(MOCK_POSTS_FROM_API);
      expect(console.error).toHaveBeenCalledTimes(0);
      fetchMock.mockReturnValueOnce(
        Promise.resolve(new Response(null, { status: 500, statusText: "this is error message" })),
      );
      expect(await fetchPosts()).toEqual([]);
      expect(console.error).toHaveBeenCalledTimes(1);
    });
  });

  describe("fetchPosts", () => {
    afterAll(() => jest.resetAllMocks());

    it("should fetch all posts with comments", async () => {
      jest
        .spyOn(global, "fetch")
        .mockReturnValueOnce(
          Promise.resolve(new Response(JSON.stringify(MOCK_POSTS_FROM_API))),
        ).mockReturnValueOnce(
          Promise.resolve(new Response(JSON.stringify(MOCK_COMMENTS_FROM_API))),
        );

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
});
