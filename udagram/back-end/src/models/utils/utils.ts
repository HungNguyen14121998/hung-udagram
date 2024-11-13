// @ts-ignore
import Client from "../../database";

export class UtilsStore {
  async truncate(): Promise<void> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "TRUNCATE TABLE users, orders, products, order_products RESTART IDENTITY";
      const result = await conn.query(sql);
      conn.release();
    } catch (err) {
      throw new Error(`Couldn't truncate database: error ${err}`);
    }
  }
}
