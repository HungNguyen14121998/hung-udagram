import { User, UserStore } from "../models/user";

const store = new UserStore();

describe("User Model", () => {
  it("should have index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should have delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("index method should return", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it("create method should return", async () => {
    const result = await store.create({
      username: "username1",
      password: "password",
    });

    expect(result.username).toEqual("username1");
  });

  it("show method should return", async () => {
    const result = await store.show("1");
    expect(result.username).toEqual("username1");
  });

  it("update method should return", async () => {
    const result = await store.update({
      id: "1",
      username: "username2",
      password: "password",
    });
    expect(result.username).toEqual("username2");
  });

  it("delete method should return", async () => {
    const result = await store.delete("1");
    expect(result.username).toEqual("username2");
  });
});
