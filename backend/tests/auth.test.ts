import request from "supertest";
import app from "../src/server";
import mongoose from "mongoose";
import User from "../models/User";

// NOTE: before running test, comment the databaseConnect(), running in server.ts file
beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/chatapp-test?retryWrites=true&w=majority");
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("test auth apis", () => {
  it("should register new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "user1",
      email: "user1@xyz.com",
      password: "wecome123",
    });
    expect(res.statusCode).toBe(201);
  });

  it("should through deplicate user message ", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      username: "user1",
      email: "user1@xyz.com",
      password: "wecome123",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("user alrady exist");
  });

  it("should login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "user1@xyz.com",
      password: "wecome123",
    });
    expect(res.statusCode).toBe(200);
  });

  it("should wrong password give error", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "user1@xyz.com",
      password: "wecome23",
    });
    expect(res.body.message).toBe("invalid credentials");
  });

  it("if wrong email give error", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "use@xyz.com",
      password: "wecome23",
    });
    expect(res.body.message).toBe("no user exist");
  });
});
