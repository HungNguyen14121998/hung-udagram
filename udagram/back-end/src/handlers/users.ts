import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users/login", login);
  app.post("/users", create);
  app.put("/users/:id", verifyAuthToken, update);
  app.delete("/users/:id", verifyAuthToken, destroy);
};

const store = new UserStore();

export const verifyAuthToken = (req: Request, res: Response, next: any) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    if (decoded) {
      next();
    } else {
      res.status(401);
    }
  } catch (error) {
    res.status(401);
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (_req: Request, res: Response) => {
  try {
    const user = await store.show(_req.params.id);
    res.status(200);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const login = async (_req: Request, res: Response) => {
  const token = await store.authenticate(
    _req.body.username,
    _req.body.password
  );
  res.status(200);
  res.json(token);
};

const create = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    password: _req.body.password,
  };

  try {
    const newUser = await store.create(user);
    var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.status(200);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (_req: Request, res: Response) => {
  const user: User = {
    id: _req.params.id,
    username: _req.body.username,
    password: _req.body.password,
  };

  try {
    const updatedUser = await store.update(user);
    res.status(200);
    res.json(updatedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (_req: Request, res: Response) => {
  try {
    const userDeleted = await store.delete(_req.params.id);
    res.status(200);
    res.json(userDeleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export default userRoutes;
