const request = require("supertest");
const baseURL = "http://127.0.0.1:8000";

describe("POST /", () => {
  const body = {
    messages: ["Happy"],
  };
  it("should test emotion detection", async () => {
    const response = await request(baseURL).post("/").send(body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      emotion: "Happy",
      emotions: { Happy: 1, Angry: 0, Surprise: 0, Sad: 0, Fear: 0 },
    });
  });
});
