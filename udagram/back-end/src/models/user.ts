// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = bcrypt.genSaltSync(Number(SALT_ROUNDS));

export type User = {
  id?: string;
  username: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Don't have user with id: (${id}): ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, saltRounds);
      const result = await conn.query(sql, [u.username, hash]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "UPDATE users SET username = $1, password_digest = $2 WHERE id = ($3) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, saltRounds);
      const result = await conn.query(sql, [u.username, hash, u.id]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable update user (${u.username}): ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id = ($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable delete user : ${err}`);
    }
  }

  async getToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, process.env.TOKEN_SECRET as string, {
      expiresIn: "90d",
    });
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<string | null> {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = "SELECT * FROM users WHERE username=($1)";
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return this.getToken(user.id);
      }
    }

    return null;
  }
}
