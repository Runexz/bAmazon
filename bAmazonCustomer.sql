DROP DATABASE IF EXISTS bAmazon_DB;

CREATE DATABASE bAmazon_DB;

USE bAmazon_DB;

CREATE TABLE products
(
    id INT NOT NULL
    AUTO_INCREMENT,
  product_name VARCHAR
    (50) NULL,
  department_name VARCHAR
    (50) NULL,
  price DECIMAL
    (10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY
    (id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Kids Playset", "Toys", 48.74, 5),
        ("Head Massager", "Health", 365.00, 2),
        ("Bluetooth Earpods", "Electronic", 24.99, 10),
        ("Air Purifier", "Health", 79.99, 5),
        ("Expandable Garden Hose", "Garden", 23.99, 20),
        ("Dog Training Collar", "Pets", 29.99, 5),
        ("Women Yoga Pants", "Health", 15.29, 10),
        ("1080p HD Projector", "Electronics", 194.65, 3),
        ("Cat Tree Tower", "Pets", 59.99, 4),
        ("NERG Elite Dart Blaster", "Toys", 29.99, 15);