import { fetchComments } from "./Comments";

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
