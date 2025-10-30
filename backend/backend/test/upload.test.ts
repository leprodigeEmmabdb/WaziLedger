// require app export for tests - adapt index.ts to export app for tests
import request from "supertest";
import app from "../src/index"; // modify index to export `app`

describe("API health", () => {
  it("GET /api/health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
  });
});
