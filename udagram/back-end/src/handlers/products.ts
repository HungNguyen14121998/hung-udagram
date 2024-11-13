import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";

const productRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
  app.put("/products/:id", update);
  app.delete("/products/:id", destroy);
};

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const product = await store.show(_req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (_req: Request, res: Response) => {
  const product: Product = {
    name: _req.body.name,
    price: Number(_req.body.price),
  };
  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (_req: Request, res: Response) => {
  const product: Product = {
    id: _req.params.id,
    name: _req.body.name,
    price: Number(_req.body.price),
  };
  try {
    const updatedProduct = await store.update(product);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (_req: Request, res: Response) => {
  try {
    const deletedProduct = await store.delete(_req.params.id);
    res.json(deletedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default productRoutes;
