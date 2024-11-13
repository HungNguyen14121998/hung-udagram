# Storefront Backend API End Point

## Routes

### User

| Endpoid      | Method | Verify Token |
| ------------ | :----: | ------------ |
| /users       |  get   |
| /users/:id   |  get   | required     |
| /users/login |  post  |
| /users       |  post  |
| /users/:id   |  put   | required     |
| /users/:id   | delete | required     |

### Product

| Endpoid       | Method |
| ------------- | :----: |
| /products     |  get   |
| /products/:id |  get   |
| /products     |  post  |
| /products/:id |  put   |
| /products/:id | delete |

### Orders

| Endpoid              | Method |
| -------------------- | :----: |
| /orders              |  get   |
| /orders/:id          |  get   |
| /orders              |  post  |
| /orders/:id          |  put   |
| /orders/:id          | delete |
| /orders/:id/products |  post  |

## Database Scheme

### User

```
TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password_digest VARCHAR
);
```

### Product

```
TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL
);
```

### Order

```
TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);
```

### OrderProduct

```
TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);
```

## Relationship

### Tables `users` references `orders`

```
orders_user_id_fke
```

### Tables `order_products` references `orders` and `products`

```
order_products_order_id_fke
order_products_product_id_fke
```
