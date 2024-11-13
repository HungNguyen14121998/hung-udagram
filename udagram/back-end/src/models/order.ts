// @ts-ignore
import Client from "../database";

export type Order = {
  id?: number;
  status: string;
  userId: number;
};

export type OrderProduct = {
  id?: string;
  quantity: number;
  orderId: number;
  productId: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      const orders = result.rows;
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`Couldn't get orders: error ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Couldn't get order: error ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *";
      const result = await conn.query(sql, [order.status, order.userId]);
      const newOrder = result.rows[0];
      conn.release();
      return newOrder;
    } catch (err) {
      throw new Error(`Couldn't get order: error ${err}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "UPDATE orders SET status = $1, user_id = $2 WHERE id = ($3) RETURNING *";
      const result = await conn.query(sql, [
        order.status,
        order.userId,
        order.id,
      ]);
      const mewOrder = result.rows[0];
      conn.release();

      return mewOrder;
    } catch (err) {
      throw new Error(`unable update order ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "DELETE FROM orders WHERE id = ($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const orderDelete = result.rows[0];
      conn.release();

      return orderDelete;
    } catch (err) {
      throw new Error(`unable delete order ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<OrderProduct> {
    // get order to see if it is open
    try {
      const ordersql = "SELECT * FROM orders WHERE id=($1)";
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(ordersql, [orderId]);
      const order = result.rows[0];

      if (order.status !== "open") {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
