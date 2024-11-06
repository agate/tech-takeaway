import { fetchPosts } from "./Posts";

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
