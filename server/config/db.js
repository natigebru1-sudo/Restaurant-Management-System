const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const connectionPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "restaurant",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const initDB = async () => {
  try {
    const connection = await connectionPool.getConnection();
    console.log("Database connected successfully");
    await connection.query(`
            CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || "restaurant"}\`
        `);

    await connection.query(
      "USE `" + (process.env.DB_NAME || "restaurant") + "`",
    );

    await createTables(connection);
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

const createTables = async (connectionPool) => {
  try {
    await connectionPool.query(`
            CREATE TABLE IF NOT EXISTS user (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(155) NOT NULL UNIQUE,
                email VARCHAR(155) NOT NULL UNIQUE,
                hashed_password VARCHAR(100) NOT NULL,
                reset_token VARCHAR(255) DEFAULT NULL,
                reset_token_expires DATETIME DEFAULT NULL,
                role ENUM("cook", "manager", "waitstaff", "customer") DEFAULT 'customer',
                contact_info VARCHAR(100) NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
            `);

    await connectionPool.query(`
                CREATE TABLE IF NOT EXISTS menu_categories (
                    category_id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(155) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
                `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS menu_items (
                            item_id INT AUTO_INCREMENT PRIMARY KEY,
                            category_id INT NOT NULL,
                            name VARCHAR(155) NOT NULL,
                            description VARCHAR(155) NOT NULL,
                            price DECIMAL(10, 2) NOT NULL,
                            is_available BOOLEAN DEFAULT TRUE,
                            image_url VARCHAR(255),
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            FOREIGN KEY(category_id) REFERENCES menu_categories(category_id)  
                        )
                    `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS ingredients (
                            ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(155) NOT NULL,
                            stock_quantity INT DEFAULT 0,
                            unit_of_measure VARCHAR(20),
                            recorder_level INT NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                        )
                        `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS menu_item_ingredients(
                            menu_item_ingredients_id INT AUTO_INCREMENT PRIMARY KEY,
                            item_id INT NOT NULL,
                            ingredient_id INT NOT NULL,
                            quantity_needed INT NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            FOREIGN KEY(item_id) REFERENCES menu_items(item_id),
                            FOREIGN KEY(ingredient_id) REFERENCES ingredients(ingredient_id)
                        )
                        `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS tables (
                            table_id INT AUTO_INCREMENT PRIMARY KEY,
                            table_number INT NOT NULL,
                            capacity INT NOT NULL,
                            status ENUM("available", "occupied", "reserved", "cleaning") DEFAULT "available",
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                        )
                        `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS reservations (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    table_id INT NOT NULL,
    reservation_datetime DATETIME NOT NULL,
    num_guests INT NOT NULL,
    status ENUM('Confirmed', 'Seated', 'Cancelled') DEFAULT 'Confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(table_id) REFERENCES tables(table_id),
    FOREIGN KEY(customer_name) REFERENCES user(username),
    FOREIGN KEY(customer_phone) REFERENCES user(contact_info)
);
                        `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS orders (
                            order_id INT PRIMARY KEY AUTO_INCREMENT,
                            user_id INT NOT NULL,
                            table_id INT NOT NULL,
                            order_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
                            total_amount DECIMAL(10, 2) DEFAULT 0.00,
                            status ENUM('Pending', 'Preparing', 'Ready', 'Served', 'Paid', 'Cancelled') DEFAULT 'Pending',
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            FOREIGN KEY(table_id) REFERENCES tables(table_id),
                            FOREIGN KEY(user_id) REFERENCES user(user_id)
                            )
                            `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS order_items(
                            order_item_id INT PRIMARY KEY AUTO_INCREMENT,
                            order_id INT NOT NULL,
                            item_id INT NOT NULL,
                            quantity INT NOT NULL,
                            unit_price DECIMAL(10, 2) NOT NULL,
                            special_requests TEXT,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
                            FOREIGN KEY(item_id) REFERENCES menu_items(item_id) 
                            )
                            `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS payments (
                            payment_id INT AUTO_INCREMENT PRIMARY KEY,
                            order_id INT NOT NULL,
                            payment_method ENUM('Cash', 'Credit Card', 'Debit Card', 'Digital Wallet'),
                            payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
                            amount DECIMAL(10, 2) NOT NULL,
                            payment_datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
                            transaction_id VARCHAR(100),
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            FOREIGN KEY (order_id) REFERENCES orders(order_id)
                            )
                            `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS sales_reports (
                            report_id INT AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT,
                            report_date DATE NOT NULL,
                            total_sales DECIMAL(15, 2) NOT NULL,
                            manager_id INT NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            FOREIGN KEY (manager_id) REFERENCES user(user_id)
                            )
                            `);

    await connectionPool.query(`
                        CREATE TABLE IF NOT EXISTS staff_schedules (
                            schedule_id INT AUTO_INCREMENT PRIMARY KEY,
                            user_id INT NOT NULL,
                            shift_date DATE NOT NULL,
                            start_time TIME NOT NULL,
                            end_time TIME NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                            FOREIGN KEY (user_id) REFERENCES user(user_id)
                            )
                            `);

    await insertDefaultData(connectionPool);
    console.log("Database tables created successfully");
  } catch (error) {
    console.error("Error Occured while creating Table", error);
    throw error;
  }
};

const insertDefaultData = async (connectionPool) => {
  try {
    const [categories] = await connectionPool.query(
      "SELECT COUNT(*) as count FROM menu_categories",
    );
    if (categories[0].count === 0) {
      await connectionPool.query(`
                INSERT INTO menu_categories (name) VALUES
                ('Breakfast'),
                ('Lunch'),
                ('Dinner'),
                ('Brunch'),
                ('Happy Hour'),
                ('Late Night'),
                ('Appetizers'),
                ('Sides'),
                ('Desserts')
            `);
    }

    const [users] = await connectionPool.query(
      "SELECT COUNT(*) as count FROM user",
    );
    if (users[0].count === 0) {
      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await connectionPool.query(
        `INSERT INTO user (username, email, hashed_password, role, contact_info) 
          VALUES (?, ?, ?, ?, ?)`,
        ["manager", "admin@rms.com", hashedPassword, "manager", "000-000-0000"],
      );
    }

    const [productCount] = await connectionPool.query(
      "SELECT COUNT(*) as count FROM menu_items",
    );

    await connectionPool.query(
      "UPDATE menu_items SET image_url = NULL WHERE image_url LIKE 'http://example.com/%'",
    );
    if (productCount[0].count <= 3) {
      const [cats] = await connectionPool.query(
        "SELECT category_id, name FROM menu_categories",
      );
      const catMap = {};
      cats.forEach((c) => {
        catMap[c.name] = c.category_id;
      });
    }

    console.log("Default data inserted successfully");
  } catch (error) {
    console.error("Error inserting default data:", error);
  }
};

const getDB = () => {
  if (!connectionPool) {
    throw new Error("Database not initialized. Call initDB() first.");
  }
  return connectionPool;
};

module.exports = { initDB, getDB };
