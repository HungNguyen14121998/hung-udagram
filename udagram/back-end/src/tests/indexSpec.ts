import app from "../server";
import request from "supertest";
import bodyParser = require("body-parser");
import { UserStore } from "../models/user";
import { ProductStore } from "../models/product";
import { OrderStore } from "../models/order";
import { UtilsStore } from "../models/utils/utils";

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const utilsStore = new UtilsStore();

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: true }));

describe("Test endpoint response", () => {
  describe("1. Test user endpoint", () => {
    it("get the api/users endpoint", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toBe(200);
    });

    it("post the api/users endpoint", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          username: "usertest1",
          password: "abcd1234",
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
    });

    it("get the api/users/:id endpoint", async () => {
      const token = await userStore.getToken("1");
      const response = await request(app)
        .get("/users/1")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("post the api/users/login endpoint", async () => {
      const response = await request(app).post("/users/login").set({
        username: "usertest1",
        password: "abcd1234",
      });
      expect(response.status).toBe(200);
    });

    it("put the api/users/:id endpoint", async () => {
      const token = await userStore.getToken("1");
      const response = await request(app)
        .put("/users/1")
        .send({
          username: "usertest2",
          password: "abcd1234",
        })
        .set("Accept", "application/json")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("delete the api/users/:id endpoint", async () => {
      const token = await userStore.getToken("1");
      const response = await request(app)
        .delete("/users/1")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });

  describe("2. Test product endpoint", () => {
    it("get the api/products endpoint", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
    });

    it("post the api/products endpoint", async () => {
      const response = await request(app)
        .post("/products")
        .send({
          name: "producttest1",
          price: 1000,
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
    });

    it("get the api/products/:id endpoint", async () => {
      const response = await request(app).get("/products/1");
      expect(response.status).toBe(200);
    });

    it("put the api/products/:id endpoint", async () => {
      const response = await request(app)
        .put("/products/1")
        .send({
          id: 1,
          name: "producttest2",
          price: 2000,
        })
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
    });

    it("delete the api/pruducts/:id endpoint", async () => {
      const response = await request(app).delete("/products/1");
      expect(response.status).toBe(200);
    });
  });

  describe("3. Test order endpoint", () => {
    it("get the api/orders endpoint", async () => {
      await userStore.create({
        username: "username2",
        password: "abcd1234",
      });
      const token = await userStore.getToken("2");
      const response = await request(app)
        .get("/orders")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("post the api/orders endpoint", async () => {
      const token = await userStore.getToken("2");
      const response = await request(app)
        .post("/orders")
        .send({
          status: "active",
          userId: 2,
        })
        .set("Accept", "application/json")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("get the api/orders/:id endpoind", async () => {
      const token = await userStore.getToken("2");
      const response = await request(app)
        .get("/orders/1")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("put the api/products/:id endpoint", async () => {
      const token = await userStore.getToken("2");
      const response = await request(app)
        .put("/orders/1")
        .send({
          status: "open",
          userId: 2,
        })
        .set("Accept", "application/json")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("delete the api/orders/:id endpoint", async () => {
      const token = await userStore.getToken("2");
      const response = await request(app)
        .delete("/orders/1")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("post the api/orders/:id/products endpoint", async () => {
      const token = await userStore.getToken("2");
      await productStore.create({
        name: "producttest2",
        price: 1000,
      });
      await orderStore.create({
        status: "open",
        userId: 2,
      });
      const response = await request(app)
        .post("/orders/2/products")
        .send({
          productId: "2",
          quantity: 1,
        })
        .set("Accept", "application/json")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);

      // truncate data
      await utilsStore.truncate();
    });
  });
});
