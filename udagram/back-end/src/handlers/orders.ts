import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";
import { verifyAuthToken } from "./users";

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, create);
  app.put("/orders/:id", verifyAuthToken, update);
  app.delete("/orders/:id", verifyAuthToken, destroy);
  // add product
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
};

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(_req.params.id));
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (_req: Request, res: Response) => {
  const order: Order = {
    userId: _req.body.userId,
    status: "active",
  };
  try {
    const newOrder = await store.create(order);
    res.status(200);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (_req: Request, res: Response) => {
  const order: Order = {
    id: Number(_req.params.id),
    status: _req.body.status,
    userId: _req.body.userId,
  };

  try {
    const updatedOrder = await store.update(order);
    res.status(200);
    res.json(updatedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (_req: Request, res: Response) => {
  try {
    const deletedOrder = await store.delete(_req.params.id);
    res.status(200);
    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.status(200);
    res.json(addProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default orderRoutes;
