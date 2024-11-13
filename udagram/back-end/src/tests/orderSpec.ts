import { OrderStore } from "../models/order";
import { UserStore } from "../models/user";
import { ProductStore } from "../models/product";
import { UtilsStore } from "../models/utils/utils";

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const utilsStore = new UtilsStore();

describe("Order Model", () => {
  it("should have index method", () => {
    expect(orderStore.index).toBeDefined();
  });

  it("should have show method", () => {
    expect(orderStore.show).toBeDefined();
  });

  it("should have create method", () => {
    expect(orderStore.create).toBeDefined();
  });

  it("should have update method", () => {
    expect(orderStore.update).toBeDefined();
  });

  it("should have delete method", () => {
    expect(orderStore.delete).toBeDefined();
  });

  it("index method should return", async () => {
    const result = await orderStore.index();
    expect(result).toEqual([]);
  });

  it("create method should return", async () => {
    await userStore.create({
      username: "usertest1",
      password: "pass1234",
    });

    const result = await orderStore.create({
      status: "active",
      userId: 1,
    });

    expect(result.status).toEqual("active");
  });

  it("show method should return", async () => {
    const result = await orderStore.show(1);
    expect(result.status).toEqual("active");
  });

  it("update method should return", async () => {
    const result = await orderStore.update({
      id: 1,
      status: "open",
      userId: 1,
    });
    expect(result.status).toEqual("open");
  });

  it("delete method should return", async () => {
    const result = await orderStore.delete("1");
    expect(result.status).toEqual("open");

    // truncate data
    await utilsStore.truncate();
  });

  it("add product method should return", async () => {
    await userStore.create({
      username: "usertest1",
      password: "abcd1234",
    });
    await productStore.create({
      name: "producttest1",
      price: 1000,
    });
    await orderStore.create({
      status: "open",
      userId: 1,
    });

    const result = await orderStore.addProduct(3, "1", "1");
    expect(result.quantity).toEqual(3);

    // truncate data
    await utilsStore.truncate();
  });
});
