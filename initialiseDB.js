const sqlite3 = require('sqlite3').verbose();

function initialise() {
    const db = new sqlite3.Database('./restaurants.sqlite');

    try {
        db.serialize(function () {
            db.run(`CREATE TABLE restaurants (
                restaurant_ID INTEGER,
                name          TEXT,
                imagelink     TEXT,
                PRIMARY KEY (restaurant_ID) )`
            )

            db.run(`CREATE TABLE menus (
                        menu_ID       INTEGER,
                        title         TEXT,
                        restaurant_ID INTEGER,
                        PRIMARY KEY (menu_ID)
                        FOREIGN KEY (restaurant_ID) REFERENCES restaurants(restaurant_ID) )`
            )

            db.run(`CREATE TABLE menuItems (
                        item_ID INTEGER,
                        name    TEXT,
                        price   INTEGER,
                        menu_ID INTEGER,
                        PRIMARY KEY (item_ID)
                        FOREIGN KEY (menu_ID) REFERENCES menus(menu_ID) )`
            )
        });
    } finally {
        db.close()
    }
}

initialise();