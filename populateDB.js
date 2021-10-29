const sqlite3 = require('sqlite3').verbose();
const restaurants = require('./restaurants.json');

const db = new sqlite3.Database('./restaurants.sqlite');

try {
    db.serialize(function () {

        let stmt;

        try {
            //go through array from top level (restaurants) - i
            for (let i = 0; i < restaurants.length; i++) {
                //populate restaurants
                stmt = db.prepare(`INSERT INTO restaurants (name, imagelink)
                       VALUES(?,?)`);
                stmt.run(restaurants[i].name, restaurants[i].image)

                //populate menus
                for (let j = 0; j < restaurants[i].menus.length; j++) {
                    stmt = db.prepare(`INSERT INTO menus (title, restaurant_ID)
                           VALUES (?, ?)`);
                    stmt.run(restaurants[i].menus[j].title, i + 1)

                    //populate menuItems
                    for (let k = 0; k < restaurants[i].menus[j].items.length; k++) {
                        stmt = db.prepare(`INSERT INTO menuItems (name, price, menu_ID)
                               VALUES (?, ?, ?)`);
                        stmt.run(restaurants[i].menus[j].items[k].name,
                            restaurants[i].menus[j].items[k].price,
                            j + 1);
                    }
                }
            }
        } catch(err) {
        } finally {
            //release resources
            stmt.finalize();
            console.log('here')
        }
    });
} finally {
    //release resources
    db.close();
}