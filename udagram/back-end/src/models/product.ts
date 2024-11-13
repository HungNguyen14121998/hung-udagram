// @ts-ignore
import Client from "../database";

export type Product = {
  id?: string;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Cannot get product with id: ${id} ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [product.name, product.price]);
      const newProduct = result.rows[0];
      conn.release();

      return newProduct;
    } catch (err) {
      throw new Error(`unable create product ${err}`);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        "UPDATE products SET name = $1, price = $2 WHERE id = ($3) RETURNING *";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.id,
      ]);
      const newProduct = result.rows[0];
      conn.release();

      return newProduct;
    } catch (err) {
      throw new Error(`unable update product ${err}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "DELETE FROM products WHERE id = ($1) RETURNING *";
      const result = await conn.query(sql, [id]);
      const deletedProduct = result.rows[0];
      conn.release();

      return deletedProduct;
    } catch (err) {
      throw new Error(`unable delete product ${err}`);
    }
  }
}
