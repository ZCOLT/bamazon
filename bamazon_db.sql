DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT(100) NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('pillow', 'bedding', 34.99, 78);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('blender', 'appliances', 306.52, 32);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('tea', 'beverages', 23.88, 96);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('unicorn', 'toys', 17.99, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('iphone', 'electronics', 999.99, 11);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('washer', 'appliances', 309.99, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('dryer', 'appliances', 289.90, 32);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('blanket', 'bedding', 25.99, 90);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('legos', 'toys', 54.99, 14);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('coke', 'beverages', 5.99, 100);
